import { EntityRepository, Repository } from 'typeorm';
import { Request } from 'express';
import { ResponseHeaders } from '@us-epa-camd/easey-common/utilities';

import { QueryBuilderHelper } from '../utils/query-builder.helper';
import { UnitComplianceDim } from '../entities/unit-compliance-dim.entity';
import { EmissionsComplianceParamsDTO } from '../dto/emissions-compliance.params.dto';

@EntityRepository(UnitComplianceDim)
export class UnitComplianceDimRepository extends Repository<UnitComplianceDim> {
  async getEmissionsCompliance(
    emissionsComplianceParamsDTO: EmissionsComplianceParamsDTO,
    req: Request,
  ): Promise<UnitComplianceDim[]> {
    const { page, perPage } = emissionsComplianceParamsDTO;
    let query = this.createQueryBuilder('ucd')
      .select([
        'ucd.year',
        'ucd.id',
        'ucd.complianceApproach',
        'ucd.avgPlanId',
        'ucd.emissionsLimitDisplay',
        'ucd.actualEmissionsRate',
        'ucd.avgPlanActual',
        'ucd.inCompliance',
        'uf.state',
        'uf.facilityName',
        'uf.facilityId',
        'uf.unitId',
        'uf.programCodeInfo',
        'odf.owner',
        'odf.operator',
      ])
      .leftJoin('ucd.unitFact', 'uf')
      .leftJoin('ucd.ownerDisplayFact', 'odf');

    query = QueryBuilderHelper.createAccountQuery(
      query,
      emissionsComplianceParamsDTO,
      ['facilityId', 'state'],
      'ucd',
      'uf',
      true,
    );
    query = QueryBuilderHelper.createComplianceQuery(
      query,
      emissionsComplianceParamsDTO,
      ['year', 'ownerOperator'],
      'ucd',
    );

    query
      .orderBy('uf.programCodeInfo')
      .addOrderBy('ucd.year')
      .addOrderBy('uf.facilityId')
      .addOrderBy('uf.unitId');

    if (page && perPage) {
      const totalCount = await query.getCount();
      ResponseHeaders.setPagination(page, perPage, totalCount, req);
    }

    return query.getMany();
  }
}
