import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { ReadStream } from 'fs';
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
  streamAllowanceTransactions(
    params: AllowanceTransactionsParamsDTO,
  ): Promise<ReadStream> {
    return this.buildQuery(params, true).stream();
  }

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
      ResponseHeaders.setPagination(page, perPage, totalCount, req);
    } else {
      results = await query.getMany();
    }

    return results;
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

  private getColumns(isStreamed: boolean): string[] {
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

    return columns.map(col => {
      if (isStreamed) {
        if (col === 'ttc.transactionTypeDescription') {
          return `${col} AS "transactionType"`;
        } else if (col === 'satc.accountTypeDescription') {
          return `${col} AS "sellAccountType"`;
        } else if (col === 'batc.accountTypeDescription') {
          return `${col} AS "buyAccountType"`;
        } else {
          return `${col} AS "${col.split('.')[1]}"`;
        }
      } else {
        return col;
      }
    });
  }

  private buildQuery(
    params: AllowanceTransactionsParamsDTO,
    isStreamed = false,
  ): SelectQueryBuilder<TransactionBlockDim> {
    let query = this.createQueryBuilder('tbd')
      .select(this.getColumns(isStreamed))
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
