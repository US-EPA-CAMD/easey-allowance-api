import {
  Injectable,
  InternalServerErrorException,
  StreamableFile,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { plainToClass } from 'class-transformer';
import { PlainToCSV, PlainToJSON } from '@us-epa-camd/easey-common/transforms';
import { v4 as uuid } from 'uuid';

import { AllowanceHoldingsDTO } from '../dto/allowance-holdings.dto';
import { AllowanceHoldingsParamsDTO } from '../dto/allowance-holdings.params.dto';
import { AllowanceHoldingDimRepository } from './allowance-holding-dim.repository';
import { AllowanceHoldingsMap } from '../maps/allowance-holdings.map';
import { fieldMappings } from '../constants/field-mappings';
import { Logger } from '@us-epa-camd/easey-common/logger';
import { ApplicableAllowanceHoldingsAttributesMap } from '../maps/applicable-allowance-holdings-attributes.map';
import { ApplicableAllowanceHoldingsAttributesDTO } from '../dto/applicable-allowance-holdings-attributes.dto';
import { Transform } from 'stream';
import { AllowanceHoldingsParamsStreamDTO } from 'src/dto/allowance-holdings-stream.params.dto';

@Injectable()
export class AllowanceHoldingsService {
  constructor(
    @InjectRepository(AllowanceHoldingDimRepository)
    private readonly allowanceHoldingsRepository: AllowanceHoldingDimRepository,
    private readonly allowanceHoldingsMap: AllowanceHoldingsMap,
    private logger: Logger,
    private readonly applicableAllowanceHoldingsAttributesMap: ApplicableAllowanceHoldingsAttributesMap,
  ) {}

  async streamAllowanceHoldings(
    req: Request,
    params: AllowanceHoldingsParamsStreamDTO,
  ): Promise<StreamableFile> {
    const stream = await this.allowanceHoldingsRepository.streamAllowanceHoldings(
      params,
    );

    req.res.setHeader(
      'X-Field-Mappings',
      JSON.stringify(fieldMappings.allowances.holdings),
    );

    const toDto = new Transform({
      objectMode: true,
      transform(data, _enc, callback) {
        delete data.accountType;
        const dto = plainToClass(AllowanceHoldingsDTO, data, {
          enableImplicitConversion: true,
        });
        callback(null, dto);
      },
    });

    if (req.headers.accept === 'text/csv') {
      const toCSV = new PlainToCSV(fieldMappings.allowances.holdings);
      return new StreamableFile(stream.pipe(toDto).pipe(toCSV), {
        type: req.headers.accept,
        disposition: `attachment; filename="allowance-holdings-${uuid()}.csv"`,
      });
    }

    const objToString = new PlainToJSON();
    return new StreamableFile(stream.pipe(toDto).pipe(objToString), {
      type: req.headers.accept,
      disposition: `attachment; filename="allowance-holdings-${uuid()}.json"`,
    });
  }

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
