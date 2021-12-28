import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';

import { AllowanceHoldingsDTO } from '../dto/allowance-holdings.dto';
import { AllowanceHoldingsParamsDTO } from '../dto/allowance-holdings.params.dto';
import { AllowanceHoldingDimRepository } from './allowance-holding-dim.repository';
import { AllowanceHoldingsMap } from '../maps/allowance-holdings.map';
import { fieldMappings } from '../constants/field-mappings';
import { Logger } from '@us-epa-camd/easey-common/logger';
import { ApplicableAllowanceHoldingsAttributesMap } from '../maps/applicable-allowance-holdings-attributes.map';
import { ApplicableAllowanceHoldingsAttributesDTO } from '../dto/applicable-allowance-holdings-attributes.dto';

@Injectable()
export class AllowanceHoldingsService {
  constructor(
    @InjectRepository(AllowanceHoldingDimRepository)
    private readonly allowanceHoldingsRepository: AllowanceHoldingDimRepository,
    private readonly allowanceHoldingsMap: AllowanceHoldingsMap,
    private logger: Logger,
    private readonly applicableAllowanceHoldingsAttributesMap: ApplicableAllowanceHoldingsAttributesMap,
  ) {}

  async getAllowanceHoldings(
    allowanceHoldingsParamsDTO: AllowanceHoldingsParamsDTO,
    req: Request,
  ): Promise<AllowanceHoldingsDTO[]> {
    this.logger.info('Getting allowance holdings');
    let query;
    try {
      query = await this.allowanceHoldingsRepository.getAllowanceHoldings(
        allowanceHoldingsParamsDTO,
        req,
      );
    } catch (e) {
      this.logger.error(InternalServerErrorException, e.message, true);
    }

    req.res.setHeader(
      'X-Field-Mappings',
      JSON.stringify(fieldMappings.allowances.holdings),
    );
    this.logger.info('Got allowance holdings');
    return this.allowanceHoldingsMap.many(query);
  }
  async getAllApplicableAllowanceHoldingsAttributes(): Promise<
    ApplicableAllowanceHoldingsAttributesDTO[]
  > {
    this.logger.info('Getting all applicable allowance holding attributes');
    let query;
    try {
      query = await this.allowanceHoldingsRepository.getAllApplicableAllowanceHoldingsAttributes();
    } catch (e) {
      this.logger.error(InternalServerErrorException, e.message, true);
    }

    this.logger.info('Got all applicable allowance holding attributes');

    return this.applicableAllowanceHoldingsAttributesMap.many(query);
  }
}
