import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';

import { fieldMappings } from '../constants/field-mappings';
import { AccountComplianceDimRepository } from './account-compliance-dim.repository';
import { AllowanceComplianceMap } from '../maps/allowance-compliance.map';
import { AllowanceComplianceParamsDTO } from '../dto/allowance-compliance.params.dto';
import { AllowanceComplianceDTO } from '../dto/allowance-compliance.dto';
import { AllowanceProgram } from '../enum/allowance-programs.enum';

@Injectable()
export class AllowanceComplianceService {
  constructor(
    @InjectRepository(AccountComplianceDimRepository)
    private readonly accountComplianceDimRepository: AccountComplianceDimRepository,
    private readonly allowanceComplianceMap: AllowanceComplianceMap,
  ) {}

  async getAllowanceCompliance(
    allowanceComplianceParamsDTO: AllowanceComplianceParamsDTO,
    req: Request,
  ): Promise<AllowanceComplianceDTO[]> {
    const query = await this.accountComplianceDimRepository.getAllowanceCompliance(
      allowanceComplianceParamsDTO,
      req,
    );

    if (
      !allowanceComplianceParamsDTO.program ||
      allowanceComplianceParamsDTO.program.includes(AllowanceProgram.OTC) ||
      allowanceComplianceParamsDTO.program.includes(AllowanceProgram.NBP)
    ) {
      req.res.setHeader(
        'X-Field-Mappings',
        JSON.stringify(fieldMappings.compliance.allowanceNbpOtc),
      );
    } else {
      req.res.setHeader(
        'X-Field-Mappings',
        JSON.stringify(fieldMappings.compliance.allowance),
      );
    }

    return this.allowanceComplianceMap.many(query);
  }
}
