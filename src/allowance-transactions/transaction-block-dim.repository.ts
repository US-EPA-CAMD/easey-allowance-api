import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { Request } from 'express';
import { ResponseHeaders } from '@us-epa-camd/easey-common/utilities';

import { QueryBuilderHelper } from '../utils/query-builder.helper';
import { TransactionBlockDim } from '../entities/transaction-block-dim.entity';
import {
  AllowanceTransactionsParamsDTO,
  PaginatedAllowanceTransactionsParamsDTO,
} from '../dto/allowance-transactions.params.dto';
import { ApplicableAllowanceTransactionsAttributesParamsDTO } from '../dto/applicable-allowance-transactions-attributes.params.dto';

@EntityRepository(TransactionBlockDim)
export class TransactionBlockDimRepository extends Repository<
  TransactionBlockDim
> {
  async getAllowanceTransactions(
    paginatedAllowanceTransactionsParamsDTO: PaginatedAllowanceTransactionsParamsDTO,
    req: Request,
  ): Promise<TransactionBlockDim[]> {
    let totalCount: number;
    let results: TransactionBlockDim[];
    const { page, perPage } = paginatedAllowanceTransactionsParamsDTO;
    const query = this.buildQuery(paginatedAllowanceTransactionsParamsDTO);

    if (page && perPage) {
      [results, totalCount] = await query.getManyAndCount();
      ResponseHeaders.setPagination(req, page, perPage, totalCount);
    } else {
      results = await query.getMany();
    }

    return results;
  }

  async getAllApplicableAllowanceTransactionsAttributes(
    applicableAllowanceTransactionsAttributesParamsDTO: ApplicableAllowanceTransactionsAttributesParamsDTO,
  ): Promise<any> {
    const query = this.createQueryBuilder('tbd')
      .select(
        [
          'tf.transactionDate',
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
          'tod.ownerOperator',
        ].map(col => {
          if (col === 'tf.programCodeInfo') {
            return `${col} AS "programCode"`;
          } else {
            return `${col} AS "${col.split('.')[1]}"`;
          }
        }),
      )
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
    return query.getRawMany();
  }

  private getColumns(): string[] {
    const columns = [
      'tbd.programCodeInfo',
      'tbd.transactionBlockId', //primarykey
      'tbd.transactionId',
      'tf.transactionTotal',
      'ttc.transactionTypeDescription',
      'tf.sellAccountNumber',
      'tf.sellAccountName',
      'satc.accountTypeDescription',
      'tf.sellFacilityName',
      'tf.sellFacilityId',
      'tf.sellState',
      'tf.sellEpaRegion',
      'tf.sellSourceCategory',
      'tf.sellOwner',
      'tf.buyAccountNumber',
      'tf.buyAccountName',
      'batc.accountTypeDescription',
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
    ];

    return columns;
  }

  private buildQuery(
    params: AllowanceTransactionsParamsDTO,
  ): SelectQueryBuilder<TransactionBlockDim> {
    let query = this.createQueryBuilder('tbd')
      .select(this.getColumns())
      .innerJoin('tbd.transactionFact', 'tf')
      .innerJoin('tf.buyAccountTypeCd', 'batc')
      .innerJoin('tf.sellAccountTypeCd', 'satc')
      .innerJoin('tf.transactionTypeCd', 'ttc');

    query = QueryBuilderHelper.createAccountQuery(
      query,
      params,
      ['vintageYear', 'programCodeInfo'],
      'tbd',
      'tf',
      true,
    );

    query = QueryBuilderHelper.createTransactionQuery(
      query,
      params,
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

    return query;
  }
}
