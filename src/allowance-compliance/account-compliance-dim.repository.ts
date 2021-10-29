import { EntityRepository, Repository } from 'typeorm';
import { Request } from 'express';
import { AllowanceProgram } from '@us-epa-camd/easey-common/enums/allowance-programs.enum';
import { ResponseHeaders } from '@us-epa-camd/easey-common/utilities';

import { QueryBuilderHelper } from '../utils/query-builder.helper';
import { AccountComplianceDim } from '../entities/account-compliance-dim.entity';
import { AllowanceComplianceParamsDTO } from '../dto/allowance-compliance.params.dto';

@EntityRepository(AccountComplianceDim)
export class AccountComplianceDimRepository extends Repository<
  AccountComplianceDim
> {
  async getAllowanceCompliance(
    allowanceComplianceParamsDTO: AllowanceComplianceParamsDTO,
    req: Request,
  ): Promise<AccountComplianceDim[]> {
    const { page, perPage, programCodeInfo } = allowanceComplianceParamsDTO;
    const selectList = [
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
      'af.state',
      'af.ownerOperator',
    ];
    if (
      !programCodeInfo ||
      programCodeInfo.includes(AllowanceProgram.OTC) ||
      programCodeInfo.includes(AllowanceProgram.NBP)
    ) {
      selectList.push(
        'acd.bankedHeld',
        'acd.currentHeld',
        'acd.totalRequiredDeductions',
        'acd.currentDeductions',
        'acd.deductOneToOne',
        'acd.deductTwoToOne',
      );
    }
    let query = this.createQueryBuilder('acd')
      .select(selectList)
      .innerJoin('acd.accountFact', 'af');

    query = QueryBuilderHelper.createAccountQuery(
      query,
      allowanceComplianceParamsDTO,
      ['facilityId', 'ownerOperator', 'state', 'programCodeInfo'],
      'acd',
      'af',
      true,
    );
    query = QueryBuilderHelper.createComplianceQuery(
      query,
      allowanceComplianceParamsDTO,
      ['year'],
      'acd',
    );

    query
      .orderBy('acd.programCodeInfo')
      .addOrderBy('acd.year')
      .addOrderBy('acd.accountNumber');

    if (page && perPage) {
      const totalCount = await query.getCount();
      ResponseHeaders.setPagination(page, perPage, totalCount, req);
    }

    return query.getMany();
  }
}
