import { Injectable } from '@nestjs/common';
import { propertyMetadata } from '@us-epa-camd/easey-common/constants';

import { BaseMap } from '@us-epa-camd/easey-common/maps';
import { ApplicableAllowanceTransactionsAttributesDTO } from '../dto/applicable-allowance-transactions-attributes.dto';

@Injectable()
export class ApplicableAllowanceTransactionsAttributesMap extends BaseMap<
  any,
  ApplicableAllowanceTransactionsAttributesDTO
> {
  public async one(entity: any): Promise<any> {
    return {
      [propertyMetadata.transactionDate.fieldLabels
        .value]: entity.transactionFact.transactionDate
        .toISOString()
        .split('T')[0],
      [propertyMetadata.vintageYear.fieldLabels.value]: entity.vintageYear,
      [propertyMetadata.programCode.fieldLabels.value]:
        entity.transactionFact.programCodeInfo,
      [propertyMetadata.buyAccountNumber.fieldLabels.value]:
        entity.transactionFact.buyAccountNumber,
      [propertyMetadata.sellAccountNumber.fieldLabels.value]:
        entity.transactionFact.sellAccountNumber,
      [propertyMetadata.buyAccountTypeCode.fieldLabels.value]:
        entity.transactionFact.buyAccountTypeCode,
      [propertyMetadata.sellAccountTypeCode.fieldLabels.value]:
        entity.transactionFact.sellAccountTypeCode,
      [propertyMetadata.buyFacilityId.fieldLabels.value]: entity.transactionFact
        .buyFacilityId
        ? Number(entity.transactionFact.buyFacilityId)
        : entity.transactionFact.buyFacilityId,
      [propertyMetadata.sellFacilityId.fieldLabels.value]: entity
        .transactionFact.sellFacilityId
        ? Number(entity.transactionFact.sellFacilityId)
        : entity.transactionFact.sellFacilityId,
      [propertyMetadata.buyState.fieldLabels.value]:
        entity.transactionFact.buyState,
      [propertyMetadata.sellState.fieldLabels.value]:
        entity.transactionFact.sellState,
      [propertyMetadata.transactionTypeCode.fieldLabels.value]:
        entity.transactionFact.transactionTypeCode,
      [propertyMetadata.ownerOperator.fieldLabels.value]:
        entity.transactionFact.transactionOwnerDim?.ownerOperator || null,
    };
  }
}
