import { Injectable } from '@nestjs/common';
import { BaseMap } from '@us-epa-camd/easey-common/maps';

import { TransactionBlockDim } from '../entities/transaction-block-dim.entity';
import { AllowanceTransactionsDTO } from '../dto/allowance-transactions.dto';

@Injectable()
export class AllowanceTransactionsMap extends BaseMap<
  TransactionBlockDim,
  AllowanceTransactionsDTO
> {
  public async one(entity: TransactionBlockDim): Promise<any> {
    return {
      programCodeInfo: entity.programCodeInfo,
      transactionId: entity.transactionId,
      transactionTotal: entity.transactionFact.transactionTotal,
      transactionType:
        entity.transactionFact.transactionTypeCd.transactionTypeDescription,
      sellAccountNumber: entity.transactionFact.sellAccountNumber,
      sellAccountName: entity.transactionFact.sellAccountName,
      sellAccountType:
        entity.transactionFact.sellAccountTypeCd.accountTypeDescription,
      sellFacilityName: entity.transactionFact.sellFacilityName,
      sellFacilityId: entity.transactionFact.sellFacilityId,
      sellState: entity.transactionFact.sellState,
      sellEpaRegion: entity.transactionFact.sellEpaRegion,
      sellSourceCategory: entity.transactionFact.sellSourceCategory,
      sellOwner: entity.transactionFact.sellOwner,
      buyAccountNumber: entity.transactionFact.buyAccountNumber,
      buyAccountName: entity.transactionFact.buyAccountName,
      buyAccountType:
        entity.transactionFact.buyAccountTypeCd.accountTypeDescription,
      buyFacilityName: entity.transactionFact.buyFacilityName,
      buyFacilityId: entity.transactionFact.buyFacilityId,
      buyState: entity.transactionFact.buyState,
      buyEpaRegion: entity.transactionFact.buyEpaRegion,
      buySourceCategory: entity.transactionFact.buySourceCategory,
      buyOwner: entity.transactionFact.buyOwner,
      transactionDate: entity.transactionFact.transactionDate,
      vintageYear: entity.vintageYear,
      startBlock: entity.startBlock,
      endBlock: entity.endBlock,
      totalBlock: entity.totalBlock,
    };
  }
}
