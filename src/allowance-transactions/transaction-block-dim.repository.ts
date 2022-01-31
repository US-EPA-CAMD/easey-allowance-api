import { EntityRepository, Repository } from 'typeorm';
import { Request } from 'express';
import { ResponseHeaders } from '@us-epa-camd/easey-common/utilities';

import { QueryBuilderHelper } from '../utils/query-builder.helper';
import { TransactionBlockDim } from '../entities/transaction-block-dim.entity';
import { AllowanceTransactionsParamsDTO } from '../dto/allowance-transactions.params.dto';
import { ApplicableAllowanceTransactionsAttributesParamsDTO } from '../dto/applicable-allowance-transactions-attributes.params.dto';

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
        'batc.accountTypeDescription',
        'satc.accountTypeDescription',
        'ttc.transactionTypeDescription',
      ])
      .innerJoin('tbd.transactionFact', 'tf')
      .innerJoin('tf.buyAccountTypeCd', 'batc')
      .innerJoin('tf.sellAccountTypeCd', 'satc')
      .innerJoin('tf.transactionTypeCd', 'ttc');

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
        'stateCode',
        'transactionBeginDate',
        'transactionEndDate',
        'transactionType',
      ],
      'tf',
      'batc',
      'satc',
      'ttc',
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

  async getAllApplicableAllowanceTransactionsAttributes(
    applicableAllowanceTransactionsAttributesParamsDTO: ApplicableAllowanceTransactionsAttributesParamsDTO,
  ): Promise<any> {
    const query = this.createQueryBuilder('tbd')
      .select([
        'tbd.vintageYear',
        'tf.programCodeInfo',
        'tf.buyAccountNumber',
        'tf.sellAccountNumber',
        'tf.buyAccountTypeCode',
        'tf.sellAccountTypeCode',
        'tf.buyFacilityId',
        'tf.sellFacilityId',
        'tf.buyState',
        'tf.sellState',
        'tf.transactionTypeCode',
        'tf.transactionDate',
        'tod.ownerOperator',
      ])
      .innerJoin('tbd.transactionFact', 'tf')
      .leftJoin('tf.transactionOwnerDim', 'tod')
      .distinctOn([
        'tbd.vintage_year',
        'tf.prg_code',
        'tf.buy_acct_number',
        'tf.sell_acct_number',
        'tf.buy_account_type_code',
        'tf.sell_account_type_code',
        'tf.buy_orispl_code',
        'tf.sell_orispl_code',
        'tf.buy_state',
        'tf.sell_state',
        'tf.transaction_type_code',
        'tf.transaction_date',
        'tod.own_display',
      ])
      .where('tf.transactionDate >= (:transactionBeginDate)', {
        transactionBeginDate:
          applicableAllowanceTransactionsAttributesParamsDTO.transactionBeginDate,
      })
      .andWhere('tf.transactionDate <= (:transactionEndDate)', {
        transactionEndDate:
          applicableAllowanceTransactionsAttributesParamsDTO.transactionEndDate,
      });

    return query.getMany();
  }
}
