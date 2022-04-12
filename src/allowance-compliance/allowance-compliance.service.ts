import {
  Injectable,
  InternalServerErrorException,
  StreamableFile,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { v4 as uuid } from 'uuid';
import { Transform } from 'stream';
import { plainToClass } from 'class-transformer';
import { Logger } from '@us-epa-camd/easey-common/logger';
import { PlainToCSV, PlainToJSON } from '@us-epa-camd/easey-common/transforms';
import { exclude } from '@us-epa-camd/easey-common/utilities';
import { ExcludeAllowanceCompliance } from '@us-epa-camd/easey-common/enums';

import { fieldMappings } from '../constants/field-mappings';
import { AccountComplianceDimRepository } from './account-compliance-dim.repository';
import { OwnerYearDimRepository } from './owner-year-dim.repository';
import { AllowanceComplianceMap } from '../maps/allowance-compliance.map';
import { OwnerOperatorsMap } from '../maps/owner-operators.map';
import {
  PaginatedAllowanceComplianceParamsDTO,
  StreamAllowanceComplianceParamsDTO,
} from '../dto/allowance-compliance.params.dto';
import { AllowanceComplianceDTO } from '../dto/allowance-compliance.dto';
import { OwnerOperatorsDTO } from '../dto/owner-operators.dto';
import { ApplicableAllowanceComplianceAttributesDTO } from '../dto/applicable-allowance-compliance-attributes.dto';
import { ApplicableAllowanceComplianceAttributesMap } from '../maps/applicable-allowance-compliance.map';
import { AccountComplianceDim } from '../entities/account-compliance-dim.entity';
import { includesOtcNbp } from '../utils/includes-otc-nbp.const';
import { ReadStream } from 'fs';
import { StreamService } from '@us-epa-camd/easey-common/stream';

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
    private readonly logger: Logger,
    private readonly streamService: StreamService,
  ) {}

  async getAllowanceCompliance(
    paginatedAllowanceComplianceParamsDTO: PaginatedAllowanceComplianceParamsDTO,
    req: Request,
  ): Promise<AllowanceComplianceDTO[]> {
    this.logger.info('Getting allowance compliance');
    let entities: AccountComplianceDim[];
    let fieldMapping;
    try {
      entities = await this.accountComplianceDimRepository.getAllowanceCompliance(
        paginatedAllowanceComplianceParamsDTO,
        req,
      );
    } catch (e) {
      this.logger.error(InternalServerErrorException, e.message);
    }

    if (includesOtcNbp(paginatedAllowanceComplianceParamsDTO)) {
      fieldMapping = fieldMappings.compliance.allowanceNbpOtc;
    } else {
      fieldMapping = fieldMappings.compliance.allowance;
    }
    this.logger.info('Setting header without program code info');
    req.res.setHeader('X-Field-Mappings', JSON.stringify(fieldMapping));

    this.logger.info('Got allowance compliance');
    return this.allowanceComplianceMap.many(entities);
  }

  async streamAllowanceCompliance(
    req: Request,
    params: StreamAllowanceComplianceParamsDTO,
  ): Promise<StreamableFile> {
    const query = this.accountComplianceDimRepository.getStreamQuery(params);
    let stream: ReadStream = await this.streamService.getStream(query);

    req.on('close', () => {
      stream.emit('end');
    });

    let fieldMapping;
    if (includesOtcNbp(params)) {
      fieldMapping = fieldMappings.compliance.allowanceNbpOtc;
    } else {
      fieldMapping = fieldMappings.compliance.allowance;
    }
    req.res.setHeader('X-Field-Mappings', JSON.stringify(fieldMapping));
    const toDto = new Transform({
      objectMode: true,
      transform(data, _enc, callback) {
        data = exclude(data, params, ExcludeAllowanceCompliance);
        if (!includesOtcNbp(params)) {
          delete data.bankedHeld;
          delete data.currentHeld;
          delete data.totalRequiredDeductions;
          delete data.currentDeductions;
          delete data.deductOneToOne;
          delete data.deductTwoToOne;
        }
        const dto = plainToClass(AllowanceComplianceDTO, data, {
          enableImplicitConversion: true,
        });
        callback(null, dto);
      },
    });

    if (req.headers.accept === 'text/csv') {
      const fieldMappingsList = params.exclude
        ? fieldMapping.filter(item => !params.exclude.includes(item.value))
        : fieldMapping;
      const toCSV = new PlainToCSV(fieldMappingsList);
      return new StreamableFile(stream.pipe(toDto).pipe(toCSV), {
        type: req.headers.accept,
        disposition: `attachment; filename="allowance-compliance-${uuid()}.csv"`,
      });
    }

    const objToString = new PlainToJSON();
    return new StreamableFile(stream.pipe(toDto).pipe(objToString), {
      type: req.headers.accept,
      disposition: `attachment; filename="allowance-compliance-${uuid()}.json"`,
    });
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
      this.logger.error(InternalServerErrorException, e.message);
    }

    return this.applicableAllowanceComplianceAttributesMap.many(query);
  }
}
