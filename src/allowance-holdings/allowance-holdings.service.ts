import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';

import { AllowanceHoldingsDTO } from '../dto/allowance-holdings.dto';
import { AllowanceHoldingsParamsDTO } from '../dto/allowance-holdings.params.dto';
import { AllowanceHoldingDimRepository } from './allowance-holding-dim.repository';
import { AllowanceHoldingsMap } from '../maps/allowance-holdings.map';
import { fieldMappings } from '../constants/field-mappings';
import { ApplicableAllowanceHoldingsAttributesMap } from '../maps/applicable-allowance-holdings-attributes.map';
import { ApplicableAllowanceHoldingsAttributesDTO } from '../dto/applicable-allowance-holdings-attributes.dto';

@Injectable()
export class AllowanceHoldingsService {
  constructor(
    @InjectRepository(AllowanceHoldingDimRepository)
    private readonly allowanceHoldingsRepository: AllowanceHoldingDimRepository,
    private readonly allowanceHoldingsMap: AllowanceHoldingsMap,
    private readonly applicableAllowanceHoldingsAttributesMap: ApplicableAllowanceHoldingsAttributesMap,
  ) {}

  async getAllowanceHoldings(
    allowanceHoldingsParamsDTO: AllowanceHoldingsParamsDTO,
    req: Request,
  ): Promise<AllowanceHoldingsDTO[]> {
    const query = await this.allowanceHoldingsRepository.getAllowanceHoldings(
      allowanceHoldingsParamsDTO,
      req,
    );

    req.res.setHeader(
      'X-Field-Mappings',
      JSON.stringify(fieldMappings.allowances.holdings),
    );

    return this.allowanceHoldingsMap.many(query);
  }

  async getAllApplicableAllowanceHoldingsAttributes(): Promise<
    ApplicableAllowanceHoldingsAttributesDTO[]
  > {
    const query = await this.allowanceHoldingsRepository.getAllApplicableAllowanceHoldingsAttributes();
    return this.applicableAllowanceHoldingsAttributesMap.many(query);
  }
}
