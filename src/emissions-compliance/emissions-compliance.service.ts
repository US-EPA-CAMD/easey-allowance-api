import {
  Injectable,
  InternalServerErrorException,
  StreamableFile,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Logger } from '@us-epa-camd/easey-common/logger';
import { PlainToCSV, PlainToJSON } from '@us-epa-camd/easey-common/transforms';
import { Transform } from 'stream';
import { plainToClass } from 'class-transformer';
import { v4 as uuid } from 'uuid';
import { exclude } from '@us-epa-camd/easey-common/utilities';
import { ExcludeEmissionsCompliance } from '@us-epa-camd/easey-common/enums';

import { fieldMappings } from '../constants/field-mappings';
import { UnitComplianceDimRepository } from './unit-compliance-dim.repository';
import { EmissionsComplianceMap } from '../maps/emissions-compliance.map';
import {
  PaginatedEmissionsComplianceParamsDTO,
  StreamEmissionsComplianceParamsDTO,
} from '../dto/emissions-compliance.params.dto';
import { EmissionsComplianceDTO } from '../dto/emissions-compliance.dto';
import { ApplicableComplianceAttributesDTO } from '../dto/applicable-compliance-attributes.dto';

@Injectable()
export class EmissionsComplianceService {
  constructor(
    @InjectRepository(UnitComplianceDimRepository)
    private readonly unitComplianceDimRepository: UnitComplianceDimRepository,
    private readonly emissionsComplianceMap: EmissionsComplianceMap,
    private readonly logger: Logger,
  ) {}

  async getEmissionsCompliance(
    paginatedEmissionsComplianceParamsDTO: PaginatedEmissionsComplianceParamsDTO,
    req: Request,
  ): Promise<EmissionsComplianceDTO[]> {
    this.logger.info('Getting emissions compliance');
    let query;
    try {
      query = await this.unitComplianceDimRepository.getEmissionsCompliance(
        paginatedEmissionsComplianceParamsDTO,
        req,
      );
    } catch (e) {
      this.logger.error(InternalServerErrorException, e.message);
    }

    req.res.setHeader(
      'X-Field-Mappings',
      JSON.stringify(fieldMappings.compliance.emissions),
    );

    this.logger.info('Got emissions Compliance');
    return this.emissionsComplianceMap.many(query);
  }

  async streamEmissionsCompliance(
    params: StreamEmissionsComplianceParamsDTO,
    req: Request,
  ): Promise<StreamableFile> {
    const stream = await this.unitComplianceDimRepository.streamEmissionsCompliance(
      params,
    );
    req.res.setHeader(
      'X-Field-Mappings',
      JSON.stringify(fieldMappings.compliance.emissions),
    );
    const toDto = new Transform({
      objectMode: true,
      transform(data, _enc, callback) {
        data = exclude(data, params, ExcludeEmissionsCompliance);
        delete data.id;
        delete data.programCodeInfo;

        const ownOprArray = [data.ownerOperator, data.operator];
        delete data.operator;
        if (
          !params.exclude?.includes(ExcludeEmissionsCompliance.OWNER_OPERATOR)
        ) {
          const ownOprList = ownOprArray
            .filter(e => e)
            .join(',')
            .slice(0, -1)
            .split('),');
          const ownOprUniqueList = [...new Set(ownOprList)];
          const ownerOperator = ownOprUniqueList.join('),');
          data.ownerOperator =
            ownerOperator.length > 0 ? `${ownerOperator})` : null;
        }
        const dto = plainToClass(EmissionsComplianceDTO, data, {
          enableImplicitConversion: true,
        });
        callback(null, dto);
      },
    });

    if (req.headers.accept === 'text/csv') {
      let fieldMappingValues = [];
      fieldMappingValues = fieldMappings.compliance.emissions;
      const fieldMappingsList = params.exclude
        ? fieldMappingValues.filter(
            item => !params.exclude.includes(item.value),
          )
        : fieldMappings.compliance.emissions;
      const toCSV = new PlainToCSV(fieldMappingsList);
      return new StreamableFile(stream.pipe(toDto).pipe(toCSV), {
        type: req.headers.accept,
        disposition: `attachment; filename="emissions-compliance-${uuid()}.csv"`,
      });
    }
    const objToString = new PlainToJSON();
    return new StreamableFile(stream.pipe(toDto).pipe(objToString), {
      type: req.headers.accept,
      disposition: `attachment; filename="emissions-compliance-${uuid()}.json"`,
    });
  }

  async getAllApplicableEmissionsComplianceAttributes(): Promise<
    ApplicableComplianceAttributesDTO[]
  > {
    let query;
    try {
      query = await this.unitComplianceDimRepository.getAllApplicableEmissionsComplianceAttributes();
    } catch (e) {
      this.logger.error(InternalServerErrorException, e.message);
    }

    return query.map(item => {
      return plainToClass(ApplicableComplianceAttributesDTO, item, {
        enableImplicitConversion: true,
      });
    });
  }
}
