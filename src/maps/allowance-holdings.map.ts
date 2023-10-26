import { Injectable } from '@nestjs/common';
import { BaseMap } from '@us-epa-camd/easey-common/maps';

import { AllowanceHoldingDim } from '../entities/allowance-holding-dim.entity';
import { AllowanceHoldingsDTO } from '../dto/allowance-holdings.dto';

@Injectable()
export class AllowanceHoldingsMap extends BaseMap<
  AllowanceHoldingDim,
  AllowanceHoldingsDTO
> {
  public async one(entity: AllowanceHoldingDim): Promise<any> {
    return {
      accountNumber: entity.accountNumber,
      accountName: entity.accountName,
      facilityId: entity.accountFact.facilityId,
      programCodeInfo: entity.programCodeInfo,
      vintageYear: entity.vintageYear,
      totalBlock: entity.totalBlock,
      startBlock: entity.startBlock,
      endBlock: entity.endBlock,
      stateCode: entity.accountFact.stateCode,
      epaRegion: entity.accountFact.epaRegion,
      ownerOperator: entity.accountFact.ownerOperator.replace(",", "|"),
      accountType: entity.accountFact.accountTypeCd.accountTypeDescription,
    };
  }
}
