import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Logger } from '@us-epa-camd/easey-common/logger';
import { plainToClass } from 'class-transformer';

import {
  excludableColumnHeader,
  fieldMappingHeader,
  fieldMappings,
} from '../constants/field-mappings';
import { UnitComplianceDimRepository } from './unit-compliance-dim.repository';
import { EmissionsComplianceMap } from '../maps/emissions-compliance.map';
import { PaginatedEmissionsComplianceParamsDTO } from '../dto/emissions-compliance.params.dto';
import { EmissionsComplianceDTO } from '../dto/emissions-compliance.dto';
import { ApplicableComplianceAttributesDTO } from '../dto/applicable-compliance-attributes.dto';
import { EaseyException } from '@us-epa-camd/easey-common/exceptions';

@Injectable()
export class EmissionsComplianceService {
  constructor(
    @InjectRepository(UnitComplianceDimRepository)
    private readonly unitComplianceDimRepository: UnitComplianceDimRepository,
    private readonly emissionsComplianceMap: EmissionsComplianceMap,
    private readonly logger: Logger,
  ) {}

  async getEmissionsCompliance(
    paginatedEmissionsComplianceParamsDTO: PaginatedEmissionsComplianceParamsDTO,
    req: Request,
  ): Promise<EmissionsComplianceDTO[]> {
    this.logger.log('Getting emissions compliance');
    let query;
    try {
      query = await this.unitComplianceDimRepository.getEmissionsCompliance(
        paginatedEmissionsComplianceParamsDTO,
        req,
      );
    } catch (e) {
      throw new EaseyException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    req.res.setHeader(
      fieldMappingHeader,
      JSON.stringify(fieldMappings.compliance.emissions.data),
    );
    req.res.setHeader(
      excludableColumnHeader,
      JSON.stringify(fieldMappings.compliance.emissions.excludableColumns),
    );

    this.logger.log('Got emissions Compliance');
    return this.emissionsComplianceMap.many(query);
  }

  async getAllApplicableEmissionsComplianceAttributes(): Promise<
    ApplicableComplianceAttributesDTO[]
  > {
    let query;
    try {
      query = await this.unitComplianceDimRepository.getAllApplicableEmissionsComplianceAttributes();
    } catch (e) {
      throw new EaseyException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return query.map(item => {
      return plainToClass(ApplicableComplianceAttributesDTO, item, {
        enableImplicitConversion: true,
      });
    });
  }
}
