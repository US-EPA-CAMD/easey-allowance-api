import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';

import { AccountFactRepository } from './account-fact.repository';
import { AccountOwnerDimRepository } from './account-owner-dim.repository';
import { AccountDTO } from '../dto/account.dto';
import { OwnerOperatorsDTO } from '../dto/owner-operators.dto';
import { AccountMap } from '../maps/account.map';
import { OwnerOperatorsMap } from '../maps/owner-operators.map';
import { AccountAttributesDTO } from '../dto/account-attributes.dto';
import { AccountAttributesParamsDTO } from '../dto/account-attributes.params.dto';
import { fieldMappings } from '../constants/field-mappings';
import { ApplicableAccountAttributesDTO } from 'src/dto/applicable-account-attributes.dto';
import { ApplicableAccountAttributesMap } from '../maps/applicable-account-attributes.map';

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
  ) {}

  async getAllAccounts(): Promise<AccountDTO[]> {
    const query = await this.accountFactRepository.getAllAccounts();
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

  async getAllApplicableAccountAttributes(): Promise<
    ApplicableAccountAttributesDTO[]
  > {
    const query = await this.accountFactRepository.getAllApplicableAccountAttributes();
    return this.applicableAccountAttributesMap.many(query);
  }

  async getAllOwnerOperators(): Promise<OwnerOperatorsDTO[]> {
    const query = await this.accountOwnerDimRepository.getAllOwnerOperators();
    return this.ownerOperatorsMap.many(query);
  }
}
