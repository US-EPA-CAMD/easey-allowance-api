import { Injectable } from '@nestjs/common';
import { propertyMetadata } from '@us-epa-camd/easey-common/constants';
import { BaseMap } from '@us-epa-camd/easey-common/maps';

import { AllowanceHoldingDim } from '../entities/allowance-holding-dim.entity';
import { AllowanceHoldingsDTO } from '../dto/allowance-holdings.dto';

@Injectable()
export class AllowanceHoldingsMap extends BaseMap<
  AllowanceHoldingDim,
  AllowanceHoldingsDTO
> {
  public async one(entity: AllowanceHoldingDim): Promise<any> {
    console.log(entity);

    return {
      accountNumber: entity.accountNumber,
      accountName: entity.accountName,
      programCodeInfo: entity.programCodeInfo,
      vintageYear: Number(entity.vintageYear),
      totalBlock: entity.totalBlock
        ? Number(entity.totalBlock)
        : entity.totalBlock,
      startBlock: Number(entity.startBlock),
      endBlock: entity.endBlock ? Number(entity.endBlock) : entity.endBlock,
      facilityId: entity.accountFact.facilityId
        ? Number(entity.accountFact.facilityId)
        : entity.accountFact.facilityId,
      stateCode: entity.accountFact.stateCode,
      epaRegion: entity.accountFact.epaRegion
        ? Number(entity.accountFact.epaRegion)
        : entity.accountFact.epaRegion,
      ownerOperator: entity.accountFact.ownerOperator,
      accountTypeDescription:
        entity.accountFact.accountTypeCd.accountTypeDescription,
    };
  }
}
