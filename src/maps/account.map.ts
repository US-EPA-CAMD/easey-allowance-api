import { Injectable } from '@nestjs/common';

import { BaseMap } from '@us-epa-camd/easey-common/maps';

import { AccountFact } from '../entities/account-fact.entity';

@Injectable()
export class AccountMap extends BaseMap<AccountFact, any> {
  public async one(entity: AccountFact): Promise<any> {
    let attributes = {};
    if (entity.programCodeInfo) {
      attributes = {
        programCodeInfo: entity.programCodeInfo,
        accountTypeDescription: entity.accountTypeCd.accountTypeDescription,
        facilityId: entity.facilityId,
        unitId: entity.unitId,
        ownerOperator: entity.ownerOperator,
        stateCode: entity.stateCode,
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
