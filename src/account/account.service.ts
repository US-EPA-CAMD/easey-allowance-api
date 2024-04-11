import { HttpStatus, Injectable } from '@nestjs/common';
import { EaseyException } from '@us-epa-camd/easey-common/exceptions';
import { Logger } from '@us-epa-camd/easey-common/logger';
import { plainToClass } from 'class-transformer';
import { Request } from 'express';

import { AccountAttributesDTO } from '../dto/account-attributes.dto';
import { AccountDTO } from '../dto/account.dto';
import { OwnerOperatorsDTO } from '../dto/owner-operators.dto';
import { AccountMap } from '../maps/account.map';
import { OwnerOperatorsMap } from '../maps/owner-operators.map';
import { AccountFactRepository } from './account-fact.repository';
import { AccountOwnerDimRepository } from './account-owner-dim.repository';

import {
  excludableColumnHeader,
  fieldMappingHeader,
  fieldMappings,
} from '../constants/field-mappings';
import { PaginatedAccountAttributesParamsDTO } from '../dto/account-attributes.params.dto';
import { ApplicableAccountAttributesDTO } from '../dto/applicable-account-attributes.dto';

@Injectable()
export class AccountService {
  constructor(
    private readonly accountFactRepository: AccountFactRepository,
    private readonly accountFactMap: AccountMap,
    private readonly accountOwnerDimRepository: AccountOwnerDimRepository,
    private readonly ownerOperatorsMap: OwnerOperatorsMap,
    private readonly logger: Logger,
  ) {}

  async getAllAccounts(): Promise<AccountDTO[]> {
    this.logger.log('Getting all accounts');
    let query;
    try {
      query = await this.accountFactRepository.getAllAccounts();
    } catch (e) {
      throw new EaseyException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    this.logger.log('Got all accounts');
    return this.accountFactMap.many(query);
  }

  async getAllAccountAttributes(
    paginatedAccountAttributesParamsDTO: PaginatedAccountAttributesParamsDTO,
    req: Request,
  ): Promise<AccountAttributesDTO[]> {
    this.logger.log('Getting all account attributes');
    let query;
    try {
      query = await this.accountFactRepository.getAllAccountAttributes(
        paginatedAccountAttributesParamsDTO,
        req,
      );
    } catch (e) {
      throw new EaseyException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    this.logger.log('Got all account attributes');

    req.res.setHeader(
      fieldMappingHeader,
      JSON.stringify(fieldMappings.allowances.accountAttributes.data),
    );

    req.res.setHeader(
      excludableColumnHeader,
      JSON.stringify(
        fieldMappings.allowances.accountAttributes.excludableColumns,
      ),
    );

    return this.accountFactMap.many(query);
  }

  async getAllApplicableAccountAttributes(): Promise<
    ApplicableAccountAttributesDTO[]
  > {
    this.logger.log('Getting all applicable account attributes');
    let query;
    try {
      query = await this.accountFactRepository.getAllApplicableAccountAttributes();
    } catch (e) {
      throw new EaseyException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    this.logger.log('Got all applicable account attributes');

    return query.map(item => {
      return plainToClass(ApplicableAccountAttributesDTO, item, {
        enableImplicitConversion: true,
      });
    });
  }

  async getAllOwnerOperators(): Promise<OwnerOperatorsDTO[]> {
    this.logger.log('Getting all owner operators');
    let query;
    try {
      query = await this.accountOwnerDimRepository.getAllOwnerOperators();
    } catch (e) {
      throw new EaseyException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    this.logger.log('Got all owner operators');
    return this.ownerOperatorsMap.many(query);
  }
}
