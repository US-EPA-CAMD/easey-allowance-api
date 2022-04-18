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
import { Transform } from 'stream';
import { exclude } from '@us-epa-camd/easey-common/utilities';
import { ExcludeAllowanceHoldings } from '@us-epa-camd/easey-common/enums';

import { AllowanceHoldingsDTO } from '../dto/allowance-holdings.dto';
import {
  PaginatedAllowanceHoldingsParamsDTO,
  StreamAllowanceHoldingsParamsDTO,
} from '../dto/allowance-holdings.params.dto';
import { AllowanceHoldingDimRepository } from './allowance-holding-dim.repository';
import { AllowanceHoldingsMap } from '../maps/allowance-holdings.map';
import {
  excludableColumnHeader,
  fieldMappingHeader,
  fieldMappings,
} from '../constants/field-mappings';
import { Logger } from '@us-epa-camd/easey-common/logger';
import { ApplicableAllowanceHoldingsAttributesDTO } from '../dto/applicable-allowance-holdings-attributes.dto';
import { StreamService } from '@us-epa-camd/easey-common/stream';
import { ReadStream } from 'fs';

@Injectable()
export class AllowanceHoldingsService {
  constructor(
    @InjectRepository(AllowanceHoldingDimRepository)
    private readonly allowanceHoldingsRepository: AllowanceHoldingDimRepository,
    private readonly allowanceHoldingsMap: AllowanceHoldingsMap,
    private readonly logger: Logger,
    private readonly streamService: StreamService,
  ) {}

  async streamAllowanceHoldings(
    req: Request,
    params: StreamAllowanceHoldingsParamsDTO,
  ): Promise<StreamableFile> {
    const query = this.allowanceHoldingsRepository.getStreamQuery(params);
    let stream: ReadStream = await this.streamService.getStream(query);

    req.on('close', () => {
      stream.emit('end');
    });

    req.res.setHeader(
      fieldMappingHeader,
      JSON.stringify(fieldMappings.allowances.holdings.data),
    );

    const toDto = new Transform({
      objectMode: true,
      transform(data, _enc, callback) {
        data = exclude(data, params, ExcludeAllowanceHoldings);
        const dto = plainToClass(AllowanceHoldingsDTO, data, {
          enableImplicitConversion: true,
        });
        callback(null, dto);
      },
    });

    if (req.headers.accept === 'text/csv') {
      let fieldMappingValues = [];
      fieldMappingValues = fieldMappings.allowances.holdings.data;
      const fieldMappingsList = params.exclude
        ? fieldMappingValues.filter(
            item => !params.exclude.includes(item.value),
          )
        : fieldMappings.allowances.holdings.data;
      const toCSV = new PlainToCSV(fieldMappingsList);
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
      this.logger.error(InternalServerErrorException, e.message, true);
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
      this.logger.error(InternalServerErrorException, e.message, true);
    }

    this.logger.info('Got all applicable allowance holding attributes');

    return query.map(item => {
      return plainToClass(ApplicableAllowanceHoldingsAttributesDTO, item, {
        enableImplicitConversion: true,
      });
    });
  }
}
