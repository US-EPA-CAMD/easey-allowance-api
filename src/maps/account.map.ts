import { Injectable } from '@nestjs/common';

import { BaseMap } from './base.map';
import { AccountFact } from '../entities/account-fact.entity';

@Injectable()
export class AccountMap extends BaseMap<AccountFact, any> {
  public async one(entity: AccountFact): Promise<any> {
    let attributes = {};
    if (entity.prgCode) {
      attributes = {
        prgCode: entity.prgCode,
        accountType: entity.accountType,
        orisCode: entity.orisCode ? Number(entity.orisCode) : entity.orisCode,
        unitId: entity.unitId,
        ownDisplay: entity.ownDisplay,
        state: entity.state,
        epaRegion: entity.epaRegion,
        nercRegion: entity.nercRegion,
      };
    }
    return {
      accountNumber: entity.accountNumber,
      accountName: entity.accountName,
      ...attributes,
    };
  }
}
