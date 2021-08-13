import { EntityRepository, Repository } from 'typeorm';
import { Request } from 'express';

import { QueryBuilderHelper } from '../utils/query-builder.helper';
import { ResponseHeaders } from '../utils/response.headers';
import { TransactionBlockDim } from '../entities/transaction-block-dim.entity';
import { AllowanceTransactionsParamsDTO } from '../dto/allowance-transactions.params.dto';

@EntityRepository(TransactionBlockDim)
export class TransactionBlockDimRepository extends Repository<
  TransactionBlockDim
> {
  async getAllowanceTransactions(
    allowanceTransactionsParamsDTO: AllowanceTransactionsParamsDTO,
    req: Request,
  ): Promise<TransactionBlockDim[]> {
    const { page, perPage } = allowanceTransactionsParamsDTO;
    let query = this.createQueryBuilder('tbd')
      .select([
        'tbd.prgCode',
        'tbd.transactionBlockId', //primarykey
        'tbd.transactionId',
        'tf.transactionTotal',
        'tf.transactionType',
        'tf.sellAccountNumber',
        'tf.sellAccountName',
        'tf.sellAccountType',
        'tf.sellFacilityName',
        'tf.sellOrisplCode',
        'tf.sellState',
        'tf.sellEpaRegion',
        'tf.sellSourceCat',
        'tf.sellOwnDisplayName',
        'tf.buyAccountNumber',
        'tf.buyAccountName',
        'tf.buyAccountType',
        'tf.buyFacilityName',
        'tf.buyOrisplCode',
        'tf.buyState',
        'tf.buyEpaRegion',
        'tf.buySourceCat',
        'tf.buyOwnDisplayName',
        'tf.transactionDate',
        'tbd.vintageYear',
        'tbd.startBlock',
        'tbd.endBlock',
        'tbd.totalBlock',
      ])
      .innerJoin('tbd.transactionFact', 'tf');
    query = QueryBuilderHelper.createAllowanceQuery(
      query,
      allowanceTransactionsParamsDTO,
      ['vintageYear', 'program'],
      'tbd',
      'tf',
      true,
    );

    query = QueryBuilderHelper.createTransactionQuery(
      query,
      allowanceTransactionsParamsDTO,
      [
        'accountType',
        'accountNumber',
        'orisCode',
        'ownerOperator',
        'state',
        'transactionBeginDate',
        'transactionEndDate',
        'transactionType',
      ],
      'tf',
    );

    query
      .orderBy('tbd.prgCode')
      .addOrderBy('tbd.transactionId')
      .addOrderBy('tbd.vintageYear')
      .addOrderBy('tbd.startBlock');

    if (page && perPage) {
      const totalCount = await query.getCount();
      ResponseHeaders.setPagination(page, perPage, totalCount, req);
    }

    return query.getMany();
  }
}
