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
      transactionTotal: entity.transactionFact.transactionTotal
        ? Number(entity.transactionFact.transactionTotal)
        : entity.transactionFact.transactionTotal,
      transactionType: entity.transactionFact.transactionType,
      sellAccountNumber: entity.transactionFact.sellAccountNumber,
      sellAccountName: entity.transactionFact.sellAccountName,
      sellAccountType: entity.transactionFact.sellAccountType,
      sellFacilityName: entity.transactionFact.sellFacilityName,
      sellOrisplCode: entity.transactionFact.sellOrisplCode
        ? Number(entity.transactionFact.sellOrisplCode)
        : entity.transactionFact.sellOrisplCode,
      sellState: entity.transactionFact.sellState,
      sellEpaRegion: entity.transactionFact.sellEpaRegion
        ? Number(entity.transactionFact.sellEpaRegion)
        : entity.transactionFact.sellEpaRegion,
      sellSourceCat: entity.transactionFact.sellSourceCat,
      sellOwnDisplayName: entity.transactionFact.sellOwnDisplayName,
      buyAccountNumber: entity.transactionFact.buyAccountNumber,
      buyAccountName: entity.transactionFact.buyAccountName,
      buyAccountType: entity.transactionFact.buyAccountType,
      buyFacilityName: entity.transactionFact.buyFacilityName,
      buyOrisplCode: entity.transactionFact.buyOrisplCode
        ? Number(entity.transactionFact.buyOrisplCode)
        : entity.transactionFact.buyOrisplCode,
      buyState: entity.transactionFact.buyState,
      buyEpaRegion: entity.transactionFact.buyEpaRegion
        ? Number(entity.transactionFact.buyEpaRegion)
        : entity.transactionFact.buyEpaRegion,
      buySourceCat: entity.transactionFact.buySourceCat,
      buyOwnDisplayName: entity.transactionFact.buyOwnDisplayName,
      transactionDate: entity.transactionFact.transactionDate
        .toISOString()
        .split('T')[0],
      vintageYear: entity.vintageYear
        ? Number(entity.vintageYear)
        : entity.vintageYear,
      startBlock: entity.startBlock
        ? Number(entity.startBlock)
        : entity.startBlock,
      endBlock: entity.endBlock ? Number(entity.endBlock) : entity.endBlock,
      totalBlock: entity.totalBlock
        ? Number(entity.totalBlock)
        : entity.totalBlock,
    };
  }
}
