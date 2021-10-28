import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { AllowanceProgram } from '@us-epa-camd/easey-common/enums';

import { fieldMappings } from '../constants/field-mappings';
import { AccountComplianceDimRepository } from './account-compliance-dim.repository';
import { OwnerYearDimRepository } from './owner-year-dim.repository';
import { AllowanceComplianceMap } from '../maps/allowance-compliance.map';
import { OwnerOperatorsMap } from '../maps/owner-operators.map';
import { AllowanceComplianceParamsDTO } from '../dto/allowance-compliance.params.dto';
import { AllowanceComplianceDTO } from '../dto/allowance-compliance.dto';
import { OwnerOperatorsDTO } from '../dto/owner-operators.dto';
import { Logger } from '@us-epa-camd/easey-common/logger';

@Injectable()
export class AllowanceComplianceService {
  constructor(
    @InjectRepository(AccountComplianceDimRepository)
    private readonly accountComplianceDimRepository: AccountComplianceDimRepository,
    private readonly allowanceComplianceMap: AllowanceComplianceMap,
    @InjectRepository(OwnerYearDimRepository)
    private readonly ownerYearDimRepository: OwnerYearDimRepository,
    private readonly ownerOperatorsMap: OwnerOperatorsMap,
    private Logger: Logger,
  ) {}

  async getAllowanceCompliance(
    allowanceComplianceParamsDTO: AllowanceComplianceParamsDTO,
    req: Request,
  ): Promise<AllowanceComplianceDTO[]> {
    this.Logger.info('Getting allowance compliance');
    let query;
    try {
      query = await this.accountComplianceDimRepository.getAllowanceCompliance(
        allowanceComplianceParamsDTO,
        req,
      );
    } catch (e) {
      this.Logger.error(InternalServerErrorException, e.message);
    }

    if (
      !allowanceComplianceParamsDTO.programCodeInfo ||
      allowanceComplianceParamsDTO.programCodeInfo.includes(
        AllowanceProgram.OTC,
      ) ||
      allowanceComplianceParamsDTO.programCodeInfo.includes(
        AllowanceProgram.NBP,
      )
    ) {
      this.Logger.info('Setting header without program code info');
      req.res.setHeader(
        'X-Field-Mappings',
        JSON.stringify(fieldMappings.compliance.allowanceNbpOtc),
      );
    } else {
      this.Logger.info('Setting header with program code info');
      req.res.setHeader(
        'X-Field-Mappings',
        JSON.stringify(fieldMappings.compliance.allowance),
      );
    }
    this.Logger.info('Got allowance compliance');
    return this.allowanceComplianceMap.many(query);
  }

  async getAllOwnerOperators(): Promise<OwnerOperatorsDTO[]> {
    const query = await this.ownerYearDimRepository.getAllOwnerOperators();
    return this.ownerOperatorsMap.many(query);
  }
}
