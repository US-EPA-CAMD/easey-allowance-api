import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';

import { fieldMappings } from '../constants/field-mappings';
import { AccountComplianceDimRepository } from './account-compliance-dim.repository';
import { OwnerYearDimRepository } from './owner-year-dim.repository';
import { AllowanceComplianceMap } from '../maps/allowance-compliance.map';
import { OwnerOperatorsMap } from '../maps/owner-operators.map';
import { AllowanceComplianceParamsDTO } from '../dto/allowance-compliance.params.dto';
import { AllowanceComplianceDTO } from '../dto/allowance-compliance.dto';
import { OwnerOperatorsDTO } from '../dto/owner-operators.dto';
import { AllowanceProgram } from '../enum/allowance-programs.enum';

@Injectable()
export class AllowanceComplianceService {
  constructor(
    @InjectRepository(AccountComplianceDimRepository)
    private readonly accountComplianceDimRepository: AccountComplianceDimRepository,
    private readonly allowanceComplianceMap: AllowanceComplianceMap,
    @InjectRepository(OwnerYearDimRepository)
    private readonly ownerYearDimRepository: OwnerYearDimRepository,
    private readonly ownerOperatorsMap: OwnerOperatorsMap
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
      !allowanceComplianceParamsDTO.programCodeInfo ||
      allowanceComplianceParamsDTO.programCodeInfo.includes(AllowanceProgram.OTC) ||
      allowanceComplianceParamsDTO.programCodeInfo.includes(AllowanceProgram.NBP)
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

  async getAllOwnerOperators(): Promise<OwnerOperatorsDTO[]> {
    const query = await this.ownerYearDimRepository.getAllOwnerOperators();
    return this.ownerOperatorsMap.many(query);
  }
}
