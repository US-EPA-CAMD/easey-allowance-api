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
      orisCode: entity.accountFact.orisCode
        ? Number(entity.accountFact.orisCode)
        : entity.accountFact.orisCode,
      prgCode: entity.prgCode,
      vintageYear: Number(entity.vintageYear),
      totalBlock: entity.totalBlock
        ? Number(entity.totalBlock)
        : entity.totalBlock,
      startBlock: Number(entity.startBlock),
      endBlock: entity.endBlock ? Number(entity.endBlock) : entity.endBlock,
      state: entity.accountFact.state,
      epaRegion: entity.accountFact.epaRegion
        ? Number(entity.accountFact.epaRegion)
        : entity.accountFact.epaRegion,
      ownDisplay: entity.accountFact.ownDisplay,
      accountType: entity.accountFact.accountType,
    };
  }
}
