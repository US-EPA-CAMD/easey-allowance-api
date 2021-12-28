import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { AllowanceProgram } from '@us-epa-camd/easey-common/enums';
import { Logger } from '@us-epa-camd/easey-common/logger';

import { fieldMappings } from '../constants/field-mappings';
import { AccountComplianceDimRepository } from './account-compliance-dim.repository';
import { OwnerYearDimRepository } from './owner-year-dim.repository';
import { AllowanceComplianceMap } from '../maps/allowance-compliance.map';
import { OwnerOperatorsMap } from '../maps/owner-operators.map';
import { AllowanceComplianceParamsDTO } from '../dto/allowance-compliance.params.dto';
import { AllowanceComplianceDTO } from '../dto/allowance-compliance.dto';
import { OwnerOperatorsDTO } from '../dto/owner-operators.dto';
import { ApplicableAllowanceComplianceAttributesDTO } from '../dto/applicable-allowance-compliance-attributes.dto';
import { ApplicableAllowanceComplianceAttributesMap } from '../maps/applicable-allowance-compliance.map';

@Injectable()
export class AllowanceComplianceService {
  constructor(
    @InjectRepository(AccountComplianceDimRepository)
    private readonly accountComplianceDimRepository: AccountComplianceDimRepository,
    private readonly allowanceComplianceMap: AllowanceComplianceMap,
    @InjectRepository(OwnerYearDimRepository)
    private readonly ownerYearDimRepository: OwnerYearDimRepository,
    private readonly ownerOperatorsMap: OwnerOperatorsMap,
    private readonly applicableAllowanceComplianceAttributesMap: ApplicableAllowanceComplianceAttributesMap,
    private logger: Logger,
  ) {}

  async getAllowanceCompliance(
    allowanceComplianceParamsDTO: AllowanceComplianceParamsDTO,
    req: Request,
  ): Promise<AllowanceComplianceDTO[]> {
    this.logger.info('Getting allowance compliance');
    let query;
    try {
      query = await this.accountComplianceDimRepository.getAllowanceCompliance(
        allowanceComplianceParamsDTO,
        req,
      );
    } catch (e) {
      this.logger.error(InternalServerErrorException, e.message, true);
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
      this.logger.info('Setting header without program code info');
      req.res.setHeader(
        'X-Field-Mappings',
        JSON.stringify(fieldMappings.compliance.allowanceNbpOtc),
      );
    } else {
      this.logger.info('Setting header with program code info');
      req.res.setHeader(
        'X-Field-Mappings',
        JSON.stringify(fieldMappings.compliance.allowance),
      );
    }
    this.logger.info('Got allowance compliance');
    return this.allowanceComplianceMap.many(query);
  }

  async getAllOwnerOperators(): Promise<OwnerOperatorsDTO[]> {
    let query;
    try {
      query = await this.ownerYearDimRepository.getAllOwnerOperators();
    } catch (e) {
      this.logger.error(InternalServerErrorException, e.message, true);
    }

    return this.ownerOperatorsMap.many(query);
  }

  async getAllApplicableAllowanceComplianceAttributes(): Promise<
    ApplicableAllowanceComplianceAttributesDTO[]
  > {
    let query;
    try {
      query = await this.accountComplianceDimRepository.getAllApplicableAllowanceComplianceAttributes();
    } catch (e) {
      this.logger.error(InternalServerErrorException, e.message, true);
    }

    return this.applicableAllowanceComplianceAttributesMap.many(query);
  }
}
