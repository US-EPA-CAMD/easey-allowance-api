import { ApiProperty } from '@nestjs/swagger';
import { propertyMetadata } from '@us-epa-camd/easey-common/constants';

export class AllowanceTransactionsDTO {
  @ApiProperty({
    description: propertyMetadata.programCodeInfo.description,
    example: propertyMetadata.programCodeInfo.example,
    name: propertyMetadata.programCodeInfo.fieldLabels.value,
  })
  programCodeInfo: string;

  @ApiProperty({
    description: propertyMetadata.transactionId.description,
    example: propertyMetadata.transactionId.example,
    name: propertyMetadata.transactionId.fieldLabels.value,
  })
  transactionId?: number;

  @ApiProperty({
    description: propertyMetadata.transactionTotal.description,
    example: propertyMetadata.transactionTotal.example,
    name: propertyMetadata.transactionTotal.fieldLabels.value,
  })
  transactionTotal?: number;

  @ApiProperty({
    description: propertyMetadata.transactionType.description,
    example: propertyMetadata.transactionType.example,
    name: propertyMetadata.transactionType.fieldLabels.value,
  })
  transactionType: string;

  @ApiProperty({
    description: propertyMetadata.sellAccountNumber.description,
    example: propertyMetadata.sellAccountNumber.example,
    name: propertyMetadata.sellAccountNumber.fieldLabels.value,
  })
  sellAccountNumber: string;

  @ApiProperty({
    description: propertyMetadata.sellAccountName.description,
    example: propertyMetadata.sellAccountName.example,
    name: propertyMetadata.sellAccountName.fieldLabels.value,
  })
  sellAccountName: string;

  @ApiProperty({
    description: propertyMetadata.sellAccountType.description,
    example: propertyMetadata.sellAccountType.example,
    name: propertyMetadata.sellAccountType.fieldLabels.value,
  })
  sellAccountType: string;

  @ApiProperty({
    description: propertyMetadata.sellFacilityName.description,
    example: propertyMetadata.sellFacilityName.example,
    name: propertyMetadata.sellFacilityName.fieldLabels.value,
  })
  sellFacilityName: string;

  @ApiProperty({
    description: propertyMetadata.sellFacilityId.description,
    example: propertyMetadata.sellFacilityId.example,
    name: propertyMetadata.sellFacilityId.fieldLabels.value,
  })
  sellFacilityId?: number;

  @ApiProperty({
    description: propertyMetadata.sellState.description,
    example: propertyMetadata.sellState.example,
    name: propertyMetadata.sellState.fieldLabels.value,
  })
  sellState: string;

  @ApiProperty({
    description: propertyMetadata.sellEpaRegion.description,
    example: propertyMetadata.sellEpaRegion.example,
    name: propertyMetadata.sellEpaRegion.fieldLabels.value,
  })
  sellEpaRegion?: number;

  @ApiProperty({
    description: propertyMetadata.sellSourceCategory.description,
    example: propertyMetadata.sellSourceCategory.example,
    name: propertyMetadata.sellSourceCategory.fieldLabels.value,
  })
  sellSourceCategory: string;

  @ApiProperty({
    description: propertyMetadata.sellOwner.description,
    example: propertyMetadata.sellOwner.example,
    name: propertyMetadata.sellOwner.fieldLabels.value,
  })
  sellOwner: string;

  @ApiProperty({
    description: propertyMetadata.buyAccountNumber.description,
    example: propertyMetadata.buyAccountNumber.example,
    name: propertyMetadata.buyAccountNumber.fieldLabels.value,
  })
  buyAccountNumber: string;

  @ApiProperty({
    description: propertyMetadata.buyAccountName.description,
    example: propertyMetadata.buyAccountName.example,
    name: propertyMetadata.buyAccountName.fieldLabels.value,
  })
  buyAccountName: string;

  @ApiProperty({
    description: propertyMetadata.buyAccountType.description,
    example: propertyMetadata.buyAccountType.example,
    name: propertyMetadata.buyAccountType.fieldLabels.value,
  })
  buyAccountType: string;

  @ApiProperty({
    description: propertyMetadata.buyFacilityName.description,
    example: propertyMetadata.buyFacilityName.example,
    name: propertyMetadata.buyFacilityName.fieldLabels.value,
  })
  buyFacilityName: string;

  @ApiProperty({
    description: propertyMetadata.buyFacilityId.description,
    example: propertyMetadata.buyFacilityId.example,
    name: propertyMetadata.buyFacilityId.fieldLabels.value,
  })
  buyFacilityId?: number;

  @ApiProperty({
    description: propertyMetadata.buyState.description,
    example: propertyMetadata.buyState.example,
    name: propertyMetadata.buyState.fieldLabels.value,
  })
  buyState: string;

  @ApiProperty({
    description: propertyMetadata.buyEpaRegion.description,
    example: propertyMetadata.buyEpaRegion.example,
    name: propertyMetadata.buyEpaRegion.fieldLabels.value,
  })
  buyEpaRegion?: number;

  @ApiProperty({
    description: propertyMetadata.buySourceCategory.description,
    example: propertyMetadata.buySourceCategory.example,
    name: propertyMetadata.buySourceCategory.fieldLabels.value,
  })
  buySourceCategory: string;

  @ApiProperty({
    description: propertyMetadata.buyOwner.description,
    example: propertyMetadata.buyOwner.example,
    name: propertyMetadata.buyOwner.fieldLabels.value,
  })
  buyOwner: string;

  @ApiProperty({
    description: propertyMetadata.transactionDate.description,
    example: propertyMetadata.transactionDate.example,
    name: propertyMetadata.transactionDate.fieldLabels.value,
  })
  transactionDate: string;

  @ApiProperty({
    description: propertyMetadata.vintageYear.description,
    example: propertyMetadata.vintageYear.example,
    name: propertyMetadata.vintageYear.fieldLabels.value,
  })
  vintageYear?: number;

  @ApiProperty({
    description: propertyMetadata.startBlock.description,
    example: propertyMetadata.startBlock.example,
    name: propertyMetadata.startBlock.fieldLabels.value,
  })
  startBlock?: number;

  @ApiProperty({
    description: propertyMetadata.endBlock.description,
    example: propertyMetadata.endBlock.example,
    name: propertyMetadata.endBlock.fieldLabels.value,
  })
  endBlock?: number;

  @ApiProperty({
    description: propertyMetadata.totalBlock.description,
    example: propertyMetadata.totalBlock.example,
    name: propertyMetadata.totalBlock.fieldLabels.value,
  })
  totalBlock?: number;
}
