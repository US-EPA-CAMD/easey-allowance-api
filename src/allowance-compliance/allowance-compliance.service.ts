import { HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Logger } from '@us-epa-camd/easey-common/logger';

import {
  excludableColumnHeader,
  fieldMappingHeader,
  fieldMappings,
} from '../constants/field-mappings';
import { AccountComplianceDimRepository } from './account-compliance-dim.repository';
import { OwnerYearDimRepository } from './owner-year-dim.repository';
import { AllowanceComplianceMap } from '../maps/allowance-compliance.map';
import { OwnerOperatorsMap } from '../maps/owner-operators.map';
import { PaginatedAllowanceComplianceParamsDTO } from '../dto/allowance-compliance.params.dto';
import { AllowanceComplianceDTO } from '../dto/allowance-compliance.dto';
import { OwnerOperatorsDTO } from '../dto/owner-operators.dto';
import { ApplicableAllowanceComplianceAttributesDTO } from '../dto/applicable-allowance-compliance-attributes.dto';
import { ApplicableAllowanceComplianceAttributesMap } from '../maps/applicable-allowance-compliance.map';
import { AccountComplianceDim } from '../entities/account-compliance-dim.entity';
import { includesOtcNbp } from '../utils/includes-otc-nbp.const';
import { EaseyException } from '@us-epa-camd/easey-common/exceptions';

@Injectable()
export class AllowanceComplianceService {
  constructor(
    private readonly accountComplianceDimRepository: AccountComplianceDimRepository,
    private readonly allowanceComplianceMap: AllowanceComplianceMap,
    private readonly ownerYearDimRepository: OwnerYearDimRepository,
    private readonly ownerOperatorsMap: OwnerOperatorsMap,
    private readonly applicableAllowanceComplianceAttributesMap: ApplicableAllowanceComplianceAttributesMap,
    private readonly logger: Logger,
  ) {}

  async getAllowanceCompliance(
    paginatedAllowanceComplianceParamsDTO: PaginatedAllowanceComplianceParamsDTO,
    req: Request,
  ): Promise<AllowanceComplianceDTO[]> {
    this.logger.log('Getting allowance compliance');
    let entities: AccountComplianceDim[];
    let fieldMapping;
    let excludableColumns;
    try {
      entities = await this.accountComplianceDimRepository.getAllowanceCompliance(
        paginatedAllowanceComplianceParamsDTO,
        req,
      );
    } catch (e) {
      throw new EaseyException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    if (includesOtcNbp(paginatedAllowanceComplianceParamsDTO)) {
      fieldMapping = fieldMappings.compliance.allowanceNbpOtc.data;
      excludableColumns =
        fieldMappings.compliance.allowanceNbpOtc.excludableColumns;
    } else {
      fieldMapping = fieldMappings.compliance.allowance.data;
      excludableColumns = fieldMappings.compliance.allowance.excludableColumns;
    }
    this.logger.log('Setting header without program code info');
    req.res.setHeader(fieldMappingHeader, JSON.stringify(fieldMapping));
    req.res.setHeader(
      excludableColumnHeader,
      JSON.stringify(excludableColumns),
    );

    this.logger.log('Got allowance compliance');
    return this.allowanceComplianceMap.many(entities);
  }

  async getAllOwnerOperators(): Promise<OwnerOperatorsDTO[]> {
    const query = await this.ownerYearDimRepository.getAllOwnerOperators();
    return this.ownerOperatorsMap.many(query);
  }

  async getAllApplicableAllowanceComplianceAttributes(): Promise<
    ApplicableAllowanceComplianceAttributesDTO[]
  > {
    let query;
    try {
      query = await this.accountComplianceDimRepository.getAllApplicableAllowanceComplianceAttributes();
    } catch (e) {
      throw new EaseyException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return this.applicableAllowanceComplianceAttributesMap.many(query);
  }
}
