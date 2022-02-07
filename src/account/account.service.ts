import {
  Injectable,
  InternalServerErrorException,
  StreamableFile,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Logger } from '@us-epa-camd/easey-common/logger';
import { plainToClass } from 'class-transformer';
import { PlainToCSV, PlainToJSON } from '@us-epa-camd/easey-common/transforms';
import { v4 as uuid } from 'uuid';

import { AccountFactRepository } from './account-fact.repository';
import { AccountOwnerDimRepository } from './account-owner-dim.repository';
import { AccountDTO } from '../dto/account.dto';
import { OwnerOperatorsDTO } from '../dto/owner-operators.dto';
import { AccountMap } from '../maps/account.map';
import { OwnerOperatorsMap } from '../maps/owner-operators.map';
import { AccountAttributesDTO } from '../dto/account-attributes.dto';
import { AccountAttributesParamsDTO } from '../dto/account-attributes.params.dto';
import { fieldMappings } from '../constants/field-mappings';
import { ApplicableAccountAttributesDTO } from '../dto/applicable-account-attributes.dto';
import { ApplicableAccountAttributesMap } from '../maps/applicable-account-attributes.map';
import { Transform } from 'stream';
import { AccountAttributesStreamParamsDTO } from '../dto/account-attributes-stream.params.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountFactRepository)
    private readonly accountFactRepository: AccountFactRepository,
    private readonly accountFactMap: AccountMap,
    private readonly applicableAccountAttributesMap: ApplicableAccountAttributesMap,
    @InjectRepository(AccountOwnerDimRepository)
    private readonly accountOwnerDimRepository: AccountOwnerDimRepository,
    private readonly ownerOperatorsMap: OwnerOperatorsMap,
    private logger: Logger,
  ) {}

  async getAllAccounts(): Promise<AccountDTO[]> {
    this.logger.info('Getting all accounts');
    let query;
    try {
      query = await this.accountFactRepository.getAllAccounts();
    } catch (e) {
      this.logger.error(InternalServerErrorException, e.message, true);
    }
    this.logger.info('Got all accounts');
    return this.accountFactMap.many(query);
  }

  async streamAllAccountAttributes(
    req: Request,
    params: AccountAttributesStreamParamsDTO,
  ): Promise<StreamableFile> {
    const stream = await this.accountFactRepository.streamAllAccountAttributes(
      params,
    );

    req.res.setHeader(
      'X-Field-Mappings',
      JSON.stringify(fieldMappings.allowances.accountAttributes),
    );

    const toDto = new Transform({
      objectMode: true,
      transform(data, _enc, callback) {
        delete data.id;
        const dto = plainToClass(AccountAttributesDTO, data, {
          enableImplicitConversion: true,
        });
        callback(null, dto);
      },
    });

    if (req.headers.accept === 'text/csv') {
      const toCSV = new PlainToCSV(fieldMappings.allowances.accountAttributes);
      return new StreamableFile(stream.pipe(toDto).pipe(toCSV), {
        type: req.headers.accept,
        disposition: `attachment; filename="account-attributes-${uuid()}.csv"`,
      });
    }

    const objToString = new PlainToJSON();
    return new StreamableFile(stream.pipe(toDto).pipe(objToString), {
      type: req.headers.accept,
      disposition: `attachment; filename="account-attributes${uuid()}.json"`,
    });
  }

  async getAllAccountAttributes(
    accountAttributesParamsDTO: AccountAttributesParamsDTO,
    req: Request,
  ): Promise<AccountAttributesDTO[]> {
    this.logger.info('Getting all account attributes');
    let query;
    try {
      query = await this.accountFactRepository.getAllAccountAttributes(
        accountAttributesParamsDTO,
        req,
      );
    } catch (e) {
      this.logger.error(InternalServerErrorException, e.message, true);
    }
    this.logger.info('Got all account attributes');

    req.res.setHeader(
      'X-Field-Mappings',
      JSON.stringify(fieldMappings.allowances.accountAttributes),
    );

    return this.accountFactMap.many(query);
  }

  async getAllApplicableAccountAttributes(): Promise<
    ApplicableAccountAttributesDTO[]
  > {
    this.logger.info('Getting all applicable account attributes');
    let query;
    try {
      query = await this.accountFactRepository.getAllApplicableAccountAttributes();
    } catch (e) {
      this.logger.error(InternalServerErrorException, e.message, true);
    }
    this.logger.info('Got all applicable account attributes');

    return this.applicableAccountAttributesMap.many(query);
  }

  async getAllOwnerOperators(): Promise<OwnerOperatorsDTO[]> {
    this.logger.info('Getting all owner operators');
    let query;
    try {
      query = await this.accountOwnerDimRepository.getAllOwnerOperators();
    } catch (e) {
      this.logger.error(InternalServerErrorException, e.message, true);
    }
    this.logger.info('Got all owner operators');

    return this.ownerOperatorsMap.many(query);
  }
}
