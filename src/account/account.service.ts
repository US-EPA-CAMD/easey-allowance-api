import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AccountFactRepository } from './account-fact.repository';
import { AccountMap } from '../maps/account.map';
import { AccountDTO } from '../dto/account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountFactRepository)
    private readonly repository: AccountFactRepository,
    private readonly map: AccountMap,
  ) {}

  async getAllAccounts(): Promise<AccountDTO[]> {
    const query = await this.repository.getAllAccounts();
    return this.map.many(query);
  }
}
