import { Injectable } from '@nestjs/common';

import { BaseMap } from './base.map';
import { AllowanceHoldingDim } from '../entities/allowance-holding-dim.entity';
import { AllowanceHoldingsDTO } from '../dto/allowance-holdings.dto';

@Injectable()
export class AllowanceHoldingsMap extends BaseMap<
  AllowanceHoldingDim,
  AllowanceHoldingsDTO
> {
  public async one(entity: AllowanceHoldingDim): Promise<AllowanceHoldingsDTO> {
    return {
      accountNumber: entity.accountNumber,
      accountName: entity.accountName,
      orisCode: entity.accountFact.orisCode,
      prgCode: entity.prgCode,
      vintageYear: entity.vintageYear,
      totalBlock: entity.totalBlock,
      startBlock: entity.startBlock,
      endBlock: entity.endBlock,
      state: entity.accountFact.state,
      epaRegion: entity.accountFact.epaRegion,
      ownDisplay: entity.accountFact.ownDisplay,
      accountType: entity.accountFact.accountType,
    };
  }
}
