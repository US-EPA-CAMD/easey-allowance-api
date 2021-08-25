import { EntityRepository, Repository } from 'typeorm';
import { Request } from 'express';

import { QueryBuilderHelper } from '../utils/query-builder.helper';
import { ResponseHeaders } from '../utils/response.headers';
import { AccountComplianceDim } from '../entities/account-compliance-dim.entity';
import { AllowanceComplianceParamsDTO } from '../dto/allowance-compliance.params.dto';
import { AllowanceProgram } from '../enum/allowance-programs.enum';

@EntityRepository(AccountComplianceDim)
export class AccountComplianceDimRepository extends Repository<
  AccountComplianceDim
> {
  async getAllowanceCompliance(
    allowanceComplianceParamsDTO: AllowanceComplianceParamsDTO,
    req: Request,
  ): Promise<AccountComplianceDim[]> {
    const { page, perPage, program } = allowanceComplianceParamsDTO;
    let selectList = [
      'acd.prgCode',
      'acd.year',
      'acd.accountNumber',
      'af.accountName',
      'af.facilityName',
      'af.orisCode',
      'acd.unitsAffected',
      'acd.allocated',
      'acd.totalAllowancesHeld',
      'acd.complianceYearEmissions',
      'acd.otherDeductions',
      'acd.totalAllowancesDeducted',
      'acd.carriedOver',
      'acd.excessEmissions',
      'af.state',
      'af.ownDisplay',
    ];
    if (
      !program ||
      program.includes(AllowanceProgram.OTC) ||
      program.includes(AllowanceProgram.NBP)
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
      ['orisCode', 'ownerOperator', 'state', 'program'],
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
      .orderBy('acd.prgCode')
      .addOrderBy('acd.year')
      .addOrderBy('acd.accountNumber');

    if (page && perPage) {
      const totalCount = await query.getCount();
      ResponseHeaders.setPagination(page, perPage, totalCount, req);
    }

    return query.getMany();
  }
}
