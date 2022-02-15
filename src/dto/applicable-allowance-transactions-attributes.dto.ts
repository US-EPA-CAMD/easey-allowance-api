import { ApiProperty } from '@nestjs/swagger';
import { propertyMetadata } from '@us-epa-camd/easey-common/constants';

export class ApplicableAllowanceTransactionsAttributesDTO {
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
  vintageYear: number;

  @ApiProperty({
    description: propertyMetadata.programCode.description,
    example: propertyMetadata.programCode.example,
    name: propertyMetadata.programCode.fieldLabels.value,
  })
  programCode: string;

  @ApiProperty({
    description: propertyMetadata.buyAccountNumber.description,
    example: propertyMetadata.buyAccountNumber.example,
    name: propertyMetadata.buyAccountNumber.fieldLabels.value,
  })
  buyAccountNumber: string;

  @ApiProperty({
    description: propertyMetadata.sellAccountNumber.description,
    example: propertyMetadata.sellAccountNumber.example,
    name: propertyMetadata.sellAccountNumber.fieldLabels.value,
  })
  sellAccountNumber: string;

  @ApiProperty({
    description: propertyMetadata.buyAccountTypeCode.description,
    example: propertyMetadata.buyAccountTypeCode.example,
    name: propertyMetadata.buyAccountTypeCode.fieldLabels.value,
  })
  buyAccountTypeCode: string;

  @ApiProperty({
    description: propertyMetadata.sellAccountTypeCode.description,
    example: propertyMetadata.sellAccountTypeCode.example,
    name: propertyMetadata.sellAccountTypeCode.fieldLabels.value,
  })
  sellAccountTypeCode: string;

  @ApiProperty({
    description: propertyMetadata.buyFacilityId.description,
    example: propertyMetadata.buyFacilityId.example,
    name: propertyMetadata.buyFacilityId.fieldLabels.value,
  })
  buyFacilityId?: number;

  @ApiProperty({
    description: propertyMetadata.sellFacilityId.description,
    example: propertyMetadata.sellFacilityId.example,
    name: propertyMetadata.sellFacilityId.fieldLabels.value,
  })
  sellFacilityId?: number;

  @ApiProperty({
    description: propertyMetadata.buyState.description,
    example: propertyMetadata.buyState.example,
    name: propertyMetadata.buyState.fieldLabels.value,
  })
  buyState: string;

  @ApiProperty({
    description: propertyMetadata.sellState.description,
    example: propertyMetadata.sellState.example,
    name: propertyMetadata.sellState.fieldLabels.value,
  })
  sellState: string;

  @ApiProperty({
    description: propertyMetadata.transactionTypeCode.description,
    example: propertyMetadata.transactionTypeCode.example,
    name: propertyMetadata.transactionTypeCode.fieldLabels.value,
  })
  transactionTypeCode: string;

  @ApiProperty({
    description: propertyMetadata.ownerOperator.description,
    example: propertyMetadata.ownerOperator.example,
    name: propertyMetadata.ownerOperator.fieldLabels.value,
  })
  ownerOperator: string;
}
