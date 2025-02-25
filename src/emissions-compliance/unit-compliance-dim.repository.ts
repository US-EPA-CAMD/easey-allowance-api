import { Injectable } from '@nestjs/common';
import { ResponseHeaders } from '@us-epa-camd/easey-common/utilities';
import { Request } from 'express';
import { EntityManager, Repository, SelectQueryBuilder } from 'typeorm';

import {
  EmissionsComplianceParamsDTO,
  PaginatedEmissionsComplianceParamsDTO,
} from '../dto/emissions-compliance.params.dto';
import { UnitComplianceDim } from '../entities/unit-compliance-dim.entity';
import { QueryBuilderHelper } from '../utils/query-builder.helper';

@Injectable()
export class UnitComplianceDimRepository extends Repository<UnitComplianceDim> {
  constructor(entityManager: EntityManager) {
    super(UnitComplianceDim, entityManager);
  }

  async getEmissionsCompliance(
    params: PaginatedEmissionsComplianceParamsDTO,
    req: Request,
  ): Promise<UnitComplianceDim[]> {
    let totalCount: number;
    let results: UnitComplianceDim[];
    const { page, perPage } = params;

    const query = this.buildQuery(params);

    if (page && perPage) {
      [results, totalCount] = await query.getManyAndCount();
      ResponseHeaders.setPagination(req, page, perPage, totalCount);
    } else {
      results = await query.getMany();
    }
    return results;
  }

  private getColumns(): string[] {
    return [
      'ucd.id',
      'uf.programCodeInfo',
      'ucd.year',
      'uf.facilityName',
      'uf.facilityId',
      'uf.unitId',
      'odf.owner',
      'odf.operator',
      'uf.stateCode',
      'ucd.complianceApproach',
      'ucd.avgPlanId',
      'ucd.emissionsLimitDisplay',
      'ucd.actualEmissionsRate',
      'ucd.avgPlanActual',
      'ucd.inCompliance',
    ];
  }

  private buildQuery(
    params: EmissionsComplianceParamsDTO,
  ): SelectQueryBuilder<UnitComplianceDim> {
    let query = this.createQueryBuilder('ucd')
      .select(this.getColumns())
      .leftJoin('ucd.unitFact', 'uf')
      .leftJoin('ucd.ownerDisplayFact', 'odf');

    query = QueryBuilderHelper.createAccountQuery(
      query,
      params,
      ['facilityId', 'stateCode'],
      'ucd',
      'uf',
      true,
    );
    query = QueryBuilderHelper.createComplianceQuery(
      query,
      params,
      ['year', 'ownerOperator'],
      'ucd',
    );

    query
      .orderBy('uf.programCodeInfo')
      .addOrderBy('ucd.year')
      .addOrderBy('uf.facilityId')
      .addOrderBy('uf.unitId');
    return query;
  }

  async getAllApplicableEmissionsComplianceAttributes(): Promise<
    UnitComplianceDim[]
  > {
    const query = this.createQueryBuilder('ucd')
      .select(
        ['ucd.year', 'uf.facilityId', 'uf.stateCode', 'oyd.ownerOperator'].map(
          col => {
            return `${col} AS "${col.split('.')[1]}"`;
          },
        ),
      )
      .innerJoin('ucd.unitFact', 'uf')
      .leftJoin('uf.ownerYearDim', 'oyd')
      .distinctOn([
        'ucd.op_year',
        'uf.orispl_code',
        'uf.stateCode',
        'oyd.own_display',
      ]);

    return query.getRawMany();
  }
}
