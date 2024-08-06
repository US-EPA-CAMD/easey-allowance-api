import { HttpStatus, Injectable } from '@nestjs/common';
import { Logger } from '@us-epa-camd/easey-common/logger';
import { plainToClass } from 'class-transformer';
import { Request } from 'express';

import { EaseyException } from '@us-epa-camd/easey-common/exceptions';
import {
  excludableColumnHeader,
  fieldMappingHeader,
  fieldMappings,
} from '../constants/field-mappings';
import { ApplicableComplianceAttributesDTO } from '../dto/applicable-compliance-attributes.dto';
import { EmissionsComplianceDTO } from '../dto/emissions-compliance.dto';
import { PaginatedEmissionsComplianceParamsDTO } from '../dto/emissions-compliance.params.dto';
import { EmissionsComplianceMap } from '../maps/emissions-compliance.map';
import { UnitComplianceDimRepository } from './unit-compliance-dim.repository';

@Injectable()
export class EmissionsComplianceService {
  constructor(
    private readonly unitComplianceDimRepository: UnitComplianceDimRepository,
    private readonly emissionsComplianceMap: EmissionsComplianceMap,
    private readonly logger: Logger,
  ) {}

  async getEmissionsCompliance(
    paginatedEmissionsComplianceParamsDTO: PaginatedEmissionsComplianceParamsDTO,
    req: Request,
  ): Promise<EmissionsComplianceDTO[]> {
    this.logger.info('Getting emissions compliance');
    let query;
    try {
      query = await this.unitComplianceDimRepository.getEmissionsCompliance(
        paginatedEmissionsComplianceParamsDTO,
        req,
      );
    } catch (e) {
      throw new EaseyException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    req.res.setHeader(
      fieldMappingHeader,
      JSON.stringify(fieldMappings.compliance.emissions.data),
    );
    req.res.setHeader(
      excludableColumnHeader,
      JSON.stringify(fieldMappings.compliance.emissions.excludableColumns),
    );

    this.logger.info('Got emissions Compliance');
    return this.emissionsComplianceMap.many(query);
  }

  async getAllApplicableEmissionsComplianceAttributes(): Promise<
    ApplicableComplianceAttributesDTO[]
  > {
    let query;
    try {
      query = await this.unitComplianceDimRepository.getAllApplicableEmissionsComplianceAttributes();
    } catch (e) {
      throw new EaseyException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return query.map(item => {
      return plainToClass(ApplicableComplianceAttributesDTO, item, {
        enableImplicitConversion: true,
      });
    });
  }
}
