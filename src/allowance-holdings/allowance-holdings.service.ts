import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';

import { AllowanceHoldingsDTO } from '../dto/allowance-holdings.dto';
import { AllowanceHoldingsParamsDTO } from '../dto/allowance-holdings.params.dto';
import { AllowanceHoldingDimRepository } from './allowance-holding-dim.repository';
import { AllowanceHoldingsMap } from '../maps/allowance-holdings.map';
import { fieldMappings } from '../constants/field-mappings';
import { Logger } from '@us-epa-camd/easey-common/logger';

@Injectable()
export class AllowanceHoldingsService {
  constructor(
    @InjectRepository(AllowanceHoldingDimRepository)
    private readonly allowanceHoldingsRepository: AllowanceHoldingDimRepository,
    private readonly allowanceHoldingsMap: AllowanceHoldingsMap,
    private Logger: Logger,
  ) {}

  async getAllowanceHoldings(
    allowanceHoldingsParamsDTO: AllowanceHoldingsParamsDTO,
    req: Request,
  ): Promise<AllowanceHoldingsDTO[]> {
    this.Logger.info('Getting allowance holdings');
    let query;
    try {
      query = await this.allowanceHoldingsRepository.getAllowanceHoldings(
        allowanceHoldingsParamsDTO,
        req,
      );
    } catch (e) {
      this.Logger.error(InternalServerErrorException, e.message);
    }

    req.res.setHeader(
      'X-Field-Mappings',
      JSON.stringify(fieldMappings.allowances.holdings),
    );
    this.Logger.info('Got allowance holdings');
    return this.allowanceHoldingsMap.many(query);
  }
}
