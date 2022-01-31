import { Injectable } from '@nestjs/common';
import { propertyMetadata } from '@us-epa-camd/easey-common/constants';
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
      [propertyMetadata.programCodeInfo.fieldLabels.value]:
        entity.programCodeInfo,
      [propertyMetadata.transactionId.fieldLabels.value]: Number(
        entity.transactionId,
      ),
      [propertyMetadata.transactionTotal.fieldLabels.value]: entity
        .transactionFact.transactionTotal
        ? Number(entity.transactionFact.transactionTotal)
        : entity.transactionFact.transactionTotal,
      [propertyMetadata.transactionType.fieldLabels.value]:
        entity.transactionFact.transactionTypeCd.transactionTypeDescription,
      [propertyMetadata.sellAccountNumber.fieldLabels.value]:
        entity.transactionFact.sellAccountNumber,
      [propertyMetadata.sellAccountName.fieldLabels.value]:
        entity.transactionFact.sellAccountName,
      [propertyMetadata.sellAccountType.fieldLabels.value]:
        entity.transactionFact.sellAccountTypeCd.accountTypeDescription,
      [propertyMetadata.sellFacilityName.fieldLabels.value]:
        entity.transactionFact.sellFacilityName,
      [propertyMetadata.sellFacilityId.fieldLabels.value]: entity
        .transactionFact.sellFacilityId
        ? Number(entity.transactionFact.sellFacilityId)
        : entity.transactionFact.sellFacilityId,
      [propertyMetadata.sellState.fieldLabels.value]:
        entity.transactionFact.sellState,
      [propertyMetadata.sellEpaRegion.fieldLabels.value]: entity.transactionFact
        .sellEpaRegion
        ? Number(entity.transactionFact.sellEpaRegion)
        : entity.transactionFact.sellEpaRegion,
      [propertyMetadata.sellSourceCategory.fieldLabels.value]:
        entity.transactionFact.sellSourceCategory,
      [propertyMetadata.sellOwner.fieldLabels.value]:
        entity.transactionFact.sellOwner,
      [propertyMetadata.buyAccountNumber.fieldLabels.value]:
        entity.transactionFact.buyAccountNumber,
      [propertyMetadata.buyAccountName.fieldLabels.value]:
        entity.transactionFact.buyAccountName,
      [propertyMetadata.buyAccountType.fieldLabels.value]:
        entity.transactionFact.buyAccountTypeCd.accountTypeDescription,
      [propertyMetadata.buyFacilityName.fieldLabels.value]:
        entity.transactionFact.buyFacilityName,
      [propertyMetadata.buyFacilityId.fieldLabels.value]: entity.transactionFact
        .buyFacilityId
        ? Number(entity.transactionFact.buyFacilityId)
        : entity.transactionFact.buyFacilityId,
      [propertyMetadata.buyState.fieldLabels.value]:
        entity.transactionFact.buyState,
      [propertyMetadata.buyEpaRegion.fieldLabels.value]: entity.transactionFact
        .buyEpaRegion
        ? Number(entity.transactionFact.buyEpaRegion)
        : entity.transactionFact.buyEpaRegion,
      [propertyMetadata.buySourceCategory.fieldLabels.value]:
        entity.transactionFact.buySourceCategory,
      [propertyMetadata.buyOwner.fieldLabels.value]:
        entity.transactionFact.buyOwner,
      [propertyMetadata.transactionDate.fieldLabels
        .value]: entity.transactionFact.transactionDate
        .toISOString()
        .split('T')[0],
      [propertyMetadata.vintageYear.fieldLabels.value]: entity.vintageYear
        ? Number(entity.vintageYear)
        : entity.vintageYear,
      [propertyMetadata.startBlock.fieldLabels.value]: entity.startBlock
        ? Number(entity.startBlock)
        : entity.startBlock,
      [propertyMetadata.endBlock.fieldLabels.value]: entity.endBlock
        ? Number(entity.endBlock)
        : entity.endBlock,
      [propertyMetadata.totalBlock.fieldLabels.value]: entity.totalBlock
        ? Number(entity.totalBlock)
        : entity.totalBlock,
    };
  }
}
