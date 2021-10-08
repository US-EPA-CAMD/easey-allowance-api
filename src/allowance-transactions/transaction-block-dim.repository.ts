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
        'tbd.programCodeInfo',
        'tbd.transactionBlockId', //primarykey
        'tbd.transactionId',
        'tf.transactionTotal',
        'tf.transactionType',
        'tf.sellAccountNumber',
        'tf.sellAccountName',
        'tf.sellAccountType',
        'tf.sellFacilityName',
        'tf.sellFacilityId',
        'tf.sellState',
        'tf.sellEpaRegion',
        'tf.sellSourceCategory',
        'tf.sellOwner',
        'tf.buyAccountNumber',
        'tf.buyAccountName',
        'tf.buyAccountType',
        'tf.buyFacilityName',
        'tf.buyFacilityId',
        'tf.buyState',
        'tf.buyEpaRegion',
        'tf.buySourceCategory',
        'tf.buyOwner',
        'tf.transactionDate',
        'tbd.vintageYear',
        'tbd.startBlock',
        'tbd.endBlock',
        'tbd.totalBlock',
      ])
      .innerJoin('tbd.transactionFact', 'tf');
    query = QueryBuilderHelper.createAccountQuery(
      query,
      allowanceTransactionsParamsDTO,
      ['vintageYear', 'programCodeInfo'],
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
        'facilityId',
        'ownerOperator',
        'state',
        'transactionBeginDate',
        'transactionEndDate',
        'transactionType',
      ],
      'tf',
    );

    query
      .orderBy('tbd.programCodeInfo')
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
