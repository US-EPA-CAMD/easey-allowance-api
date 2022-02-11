import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { Request } from 'express';
import { ResponseHeaders } from '@us-epa-camd/easey-common/utilities';
import { ReadStream } from 'typeorm/platform/PlatformTools';

import { QueryBuilderHelper } from '../utils/query-builder.helper';
import { UnitComplianceDim } from '../entities/unit-compliance-dim.entity';
import {
  EmissionsComplianceParamsDTO,
  PaginatedEmissionsComplianceParamsDTO,
} from '../dto/emissions-compliance.params.dto';

@EntityRepository(UnitComplianceDim)
export class UnitComplianceDimRepository extends Repository<UnitComplianceDim> {
  streamEmissionsCompliance(
    params: EmissionsComplianceParamsDTO,
  ): Promise<ReadStream> {
    return this.buildQuery(params, true).stream();
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
      ResponseHeaders.setPagination(page, perPage, totalCount, req);
    } else {
      results = await query.getMany();
    }
    return results;
  }

  private getColumns(isStreamed: boolean): string[] {
    const columns = [
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

    return columns.map(col => {
      if (isStreamed) {
        if (col === 'odf.owner') {
          return `${col} AS "ownerOperator"`;
        } else {
          return `${col} AS "${col.split('.')[1]}"`;
        }
      } else {
        return col;
      }
    });
  }

  private buildQuery(
    params: EmissionsComplianceParamsDTO,
    isStreamed = false,
  ): SelectQueryBuilder<UnitComplianceDim> {
    let query = this.createQueryBuilder('ucd')
      .select(this.getColumns(isStreamed))
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
      .select([
        'ucd.year',
        'uf.facilityId',
        'uf.stateCode',
        'oyd.ownerOperator',
      ])
      .innerJoin('ucd.unitFact', 'uf')
      .leftJoin('uf.ownerYearDim', 'oyd')
      .distinctOn([
        'ucd.op_year',
        'uf.orispl_code',
        'uf.stateCode',
        'oyd.own_display',
      ]);

    return query.getMany();
  }
}
