import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Logger } from '@us-epa-camd/easey-common/logger';

import { fieldMappings } from '../constants/field-mappings';
import { UnitComplianceDimRepository } from './unit-compliance-dim.repository';
import { EmissionsComplianceMap } from '../maps/emissions-compliance.map';
import { EmissionsComplianceParamsDTO } from '../dto/emissions-compliance.params.dto';
import { EmissionsComplianceDTO } from '../dto/emissions-compliance.dto';
import { ApplicableComplianceAttributesDTO } from '../dto/applicable-compliance-attributes.dto';
import { ApplicableEmissionsComplianceAttributesMap } from '../maps/applicable-emissions-compliance-map';

@Injectable()
export class EmissionsComplianceService {
  constructor(
    @InjectRepository(UnitComplianceDimRepository)
    private readonly unitComplianceDimRepository: UnitComplianceDimRepository,
    private readonly emissionsComplianceMap: EmissionsComplianceMap,
    private readonly applicableEmissionsComplianceAttributesMap: ApplicableEmissionsComplianceAttributesMap,
    private Logger: Logger,
  ) {}

  async getEmissionsCompliance(
    emissionsComplianceParamsDTO: EmissionsComplianceParamsDTO,
    req: Request,
  ): Promise<EmissionsComplianceDTO[]> {
    const query = await this.unitComplianceDimRepository.getEmissionsCompliance(
      emissionsComplianceParamsDTO,
      req,
    );

    req.res.setHeader(
      'X-Field-Mappings',
      JSON.stringify(fieldMappings.compliance.emissions),
    );

    return this.emissionsComplianceMap.many(query);
  }

  async getAllApplicableEmissionsComplianceAttributes(): Promise<
    ApplicableComplianceAttributesDTO[]
  > {
    let query;
    try {
      query = await this.unitComplianceDimRepository.getAllApplicableEmissionsComplianceAttributes();
    } catch (e) {
      this.Logger.error(InternalServerErrorException, e.message);
    }

    return this.applicableEmissionsComplianceAttributesMap.many(query);
  }
}
