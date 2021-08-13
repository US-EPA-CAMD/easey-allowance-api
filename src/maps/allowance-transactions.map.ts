import { Injectable } from '@nestjs/common';

import { BaseMap } from './base.map';
import { TransactionBlockDim } from '../entities/transaction-block-dim.entity';
import { AllowanceTransactionsDTO } from '../dto/allowance-transactions.dto';

@Injectable()
export class AllowanceTransactionsMap extends BaseMap<
  TransactionBlockDim,
  AllowanceTransactionsDTO
> {
  public async one(
    entity: TransactionBlockDim,
  ): Promise<AllowanceTransactionsDTO> {
    return {
      prgCode: entity.prgCode,
      transactionId: Number(entity.transactionId),
      transactionTotal: Number(entity.transactionFact.transactionTotal),
      transactionType: entity.transactionFact.transactionType,
      sellAccountNumber: entity.transactionFact.sellAccountNumber,
      sellAccountName: entity.transactionFact.sellAccountName,
      sellAccountType: entity.transactionFact.sellAccountType,
      sellFacilityName: entity.transactionFact.sellFacilityName,
      sellOrisplCode: Number(entity.transactionFact.sellOrisplCode),
      sellState: entity.transactionFact.sellState,
      sellEpaRegion: Number(entity.transactionFact.sellEpaRegion),
      sellSourceCat: entity.transactionFact.sellSourceCat,
      sellOwnDisplayName: entity.transactionFact.sellOwnDisplayName,
      buyAccountNumber: entity.transactionFact.buyAccountNumber,
      buyAccountName: entity.transactionFact.buyAccountName,
      buyAccountType: entity.transactionFact.buyAccountType,
      buyFacilityName: entity.transactionFact.buyFacilityName,
      buyOrisplCode: Number(entity.transactionFact.buyOrisplCode),
      buyState: entity.transactionFact.buyState,
      buyEpaRegion: Number(entity.transactionFact.buyEpaRegion),
      buySourceCat: entity.transactionFact.buySourceCat,
      buyOwnDisplayName: entity.transactionFact.buyOwnDisplayName,
      transactionDate: entity.transactionFact.transactionDate
        .toISOString()
        .split('T')[0],
      vintageYear: Number(entity.vintageYear),
      startBlock: Number(entity.startBlock),
      endBlock: Number(entity.endBlock),
      totalBlock: Number(entity.totalBlock),
    };
  }
}
