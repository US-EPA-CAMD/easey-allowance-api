import { HttpStatus, Injectable } from '@nestjs/common';
import { EaseyException } from '@us-epa-camd/easey-common/exceptions';
import { plainToClass } from 'class-transformer';
import { Request } from 'express';

import { Logger } from '@us-epa-camd/easey-common/logger';
import {
  excludableColumnHeader,
  fieldMappingHeader,
  fieldMappings,
} from '../constants/field-mappings';
import { AllowanceHoldingsDTO } from '../dto/allowance-holdings.dto';
import { PaginatedAllowanceHoldingsParamsDTO } from '../dto/allowance-holdings.params.dto';
import { ApplicableAllowanceHoldingsAttributesDTO } from '../dto/applicable-allowance-holdings-attributes.dto';
import { AllowanceHoldingsMap } from '../maps/allowance-holdings.map';
import { AllowanceHoldingDimRepository } from './allowance-holding-dim.repository';

@Injectable()
export class AllowanceHoldingsService {
  constructor(
    private readonly allowanceHoldingsRepository: AllowanceHoldingDimRepository,
    private readonly allowanceHoldingsMap: AllowanceHoldingsMap,
    private readonly logger: Logger,
  ) {}
  async getAllowanceHoldings(
    paginatedAllowanceHoldingsParamsDTO: PaginatedAllowanceHoldingsParamsDTO,
    req: Request,
  ): Promise<AllowanceHoldingsDTO[]> {
    this.logger.info('Getting allowance holdings');
    let query;
    try {
      query = await this.allowanceHoldingsRepository.getAllowanceHoldings(
        paginatedAllowanceHoldingsParamsDTO,
        req,
      );
    } catch (e) {
      throw new EaseyException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    req.res.setHeader(
      fieldMappingHeader,
      JSON.stringify(fieldMappings.allowances.holdings.data),
    );
    req.res.setHeader(
      excludableColumnHeader,
      JSON.stringify(fieldMappings.allowances.holdings.excludableColumns),
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
      throw new EaseyException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    this.logger.info('Got all applicable allowance holding attributes');

    return query.map(item => {
      return plainToClass(ApplicableAllowanceHoldingsAttributesDTO, item, {
        enableImplicitConversion: true,
      });
    });
  }
}
