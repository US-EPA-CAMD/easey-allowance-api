import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';

import { fieldMappings } from '../constants/field-mappings';
import { UnitComplianceDimRepository } from './unit-compliance-dim.repository';
import { EmissionsComplianceMap } from '../maps/emissions-compliance.map';
import { EmissionsComplianceParamsDTO } from '../dto/emissions-compliance.params.dto';
import { EmissionsComplianceDTO } from '../dto/emissions-compliance.dto';

@Injectable()
export class EmissionsComplianceService {
  constructor(
    @InjectRepository(UnitComplianceDimRepository)
    private readonly unitComplianceDimRepository: UnitComplianceDimRepository,
    private readonly emissionsComplianceMap: EmissionsComplianceMap,
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
}
