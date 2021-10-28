import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Logger } from '@us-epa-camd/easey-common/logger';

import { AccountFactRepository } from './account-fact.repository';
import { AccountOwnerDimRepository } from './account-owner-dim.repository';
import { AccountDTO } from '../dto/account.dto';
import { OwnerOperatorsDTO } from '../dto/owner-operators.dto';
import { AccountMap } from '../maps/account.map';
import { OwnerOperatorsMap } from '../maps/owner-operators.map';
import { AccountAttributesDTO } from '../dto/account-attributes.dto';
import { AccountAttributesParamsDTO } from '../dto/account-attributes.params.dto';
import { fieldMappings } from '../constants/field-mappings';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountFactRepository)
    private readonly accountFactRepository: AccountFactRepository,
    private readonly accountFactMap: AccountMap,
    @InjectRepository(AccountOwnerDimRepository)
    private readonly accountOwnerDimRepository: AccountOwnerDimRepository,
    private readonly ownerOperatorsMap: OwnerOperatorsMap,
    private Logger: Logger,
  ) {}

  async getAllAccounts(): Promise<AccountDTO[]> {
    this.Logger.info('Getting all accounts');
    let query;
    try {
      query = await this.accountFactRepository.getAllAccounts();
    } catch (e) {
      this.Logger.error(InternalServerErrorException, e.message);
    }
    this.Logger.info('Got all accounts');
    return this.accountFactMap.many(query);
  }

  async getAllAccountAttributes(
    accountAttributesParamsDTO: AccountAttributesParamsDTO,
    req: Request,
  ): Promise<AccountAttributesDTO[]> {
    const query = await this.accountFactRepository.getAllAccountAttributes(
      accountAttributesParamsDTO,
      req,
    );

    req.res.setHeader(
      'X-Field-Mappings',
      JSON.stringify(fieldMappings.allowances.accountAttributes),
    );

    return this.accountFactMap.many(query);
  }

  async getAllOwnerOperators(): Promise<OwnerOperatorsDTO[]> {
    const query = await this.accountOwnerDimRepository.getAllOwnerOperators();
    return this.ownerOperatorsMap.many(query);
  }
}
