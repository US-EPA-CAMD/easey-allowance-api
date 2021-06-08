import { Injectable } from '@nestjs/common';

import { BaseMap } from './base.map';
import { AccountFact } from '../entities/account-fact.entity';
import { AccountDTO } from '../dto/account.dto';

@Injectable()
export class AccountMap extends BaseMap<AccountFact, AccountDTO> {
  public async one(entity: AccountFact): Promise<AccountDTO> {
    return {
      accountNumber: entity.accountNumber,
      accountName: entity.accountName,
    };
  }
}
