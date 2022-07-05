import { AccountOwnerDim } from './../entities/account-owner-dim.entity';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { Request } from 'express';

import { ResponseHeaders } from '@us-epa-camd/easey-common/utilities';

import { QueryBuilderHelper } from '../utils/query-builder.helper';
import { AccountComplianceDim } from '../entities/account-compliance-dim.entity';
import { UnitFact } from '../entities/unit-fact.entity';
import {
  AllowanceComplianceParamsDTO,
  PaginatedAllowanceComplianceParamsDTO,
} from '../dto/allowance-compliance.params.dto';
import { OwnerYearDim } from '../entities/owner-year-dim.entity';
import { AccountFact } from '../entities/account-fact.entity';
import { includesOtcNbp } from '../utils/includes-otc-nbp.const';

@EntityRepository(AccountComplianceDim)
export class AccountComplianceDimRepository extends Repository<
  AccountComplianceDim
> {
  async getAllowanceCompliance(
    params: PaginatedAllowanceComplianceParamsDTO,
    req: Request,
  ): Promise<AccountComplianceDim[]> {
    let totalCount: number;
    let results: AccountComplianceDim[];
    const { page, perPage } = params;
    const isOtcNbp = includesOtcNbp(params);

    const query = this.buildQuery(params, isOtcNbp);

    if (page && perPage) {
      [results, totalCount] = await query.getManyAndCount();
      ResponseHeaders.setPagination(req, page, perPage, totalCount);
    } else {
      results = await query.getMany();
    }
    return results;
  }

  private getColumns(isOTCNBP: boolean): string[] {
    let columns;
    if (isOTCNBP) {
      columns = [
        'acd.programCodeInfo',
        'acd.year',
        'acd.accountNumber',
        'af.accountName',
        'af.facilityName',
        'af.facilityId',
        'acd.unitsAffected',
        'acd.allocated',
        'acd.bankedHeld',
        'acd.currentHeld',
        'acd.totalAllowancesHeld',
        'acd.complianceYearEmissions',
        'acd.otherDeductions',
        'acd.totalRequiredDeductions',
        'acd.currentDeductions',
        'acd.deductOneToOne',
        'acd.deductTwoToOne',
        'acd.totalAllowancesDeducted',
        'acd.carriedOver',
        'acd.excessEmissions',
        'af.ownerOperator',
        'af.stateCode',
      ];
    } else {
      columns = [
        'acd.programCodeInfo',
        'acd.year',
        'acd.accountNumber',
        'af.accountName',
        'af.facilityName',
        'af.facilityId',
        'acd.unitsAffected',
        'acd.allocated',
        'acd.totalAllowancesHeld',
        'acd.complianceYearEmissions',
        'acd.otherDeductions',
        'acd.totalAllowancesDeducted',
        'acd.carriedOver',
        'acd.excessEmissions',
        'af.ownerOperator',
        'af.stateCode',
      ];
    }

    return columns;
  }

  private buildQuery(
    params: AllowanceComplianceParamsDTO,
    isOtcNbp,
  ): SelectQueryBuilder<AccountComplianceDim> {
    let query = this.createQueryBuilder('acd')
      .select(this.getColumns(isOtcNbp))
      .innerJoin('acd.accountFact', 'af');

    query = QueryBuilderHelper.createAccountQuery(
      query,
      params,
      ['facilityId', 'ownerOperator', 'stateCode', 'programCodeInfo'],
      'acd',
      'af',
      true,
    );
    query = QueryBuilderHelper.createComplianceQuery(
      query,
      params,
      ['year'],
      'acd',
    );

    query
      .orderBy('acd.programCodeInfo')
      .addOrderBy('acd.year')
      .addOrderBy('acd.accountNumber');

    return query;
  }

  async getAllApplicableAllowanceComplianceAttributes(): Promise<any> {
    const query = this.createQueryBuilder('acd')
      .select([
        'acd.year',
        'af.programCodeInfo',
        'af.facilityId',
        'af.stateCode',
        'aod.ownerOperator',
      ])
      .innerJoin(
        AccountFact,
        'af',
        ' af.accountNumber = acd.accountNumber AND af.programCodeInfo = acd.programCodeInfo',
      )
      .leftJoin(
        AccountOwnerDim,
        'aod',
        'aod.accountNumber = acd.accountNumber AND aod.programCodeInfo = acd.programCodeInfo',
      )
      .distinctOn([
        'acd.op_year',
        'af.prg_code',
        'af.orispl_code',
        'af.stateCode',
        'aod.own_display',
      ]);
      
    return query.getRawMany();
  }
}
