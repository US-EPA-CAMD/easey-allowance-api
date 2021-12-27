import { ApiProperty } from '@nestjs/swagger';
import { propertyMetadata } from '@us-epa-camd/easey-common/constants';

export class AllowanceHoldingsDTO {
  @ApiProperty({
    description: propertyMetadata.accountNumber.description,
    example: propertyMetadata.accountNumber.example,
    name: propertyMetadata.accountNumber.fieldLabels.value,
  })
  accountNumber: string;

  @ApiProperty({
    description: propertyMetadata.accountName.description,
    example: propertyMetadata.accountName.example,
    name: propertyMetadata.accountName.fieldLabels.value,
  })
  accountName: string;

  @ApiProperty({
    description: propertyMetadata.facilityId.description,
    example: propertyMetadata.facilityId.example,
    name: propertyMetadata.facilityId.fieldLabels.value,
  })
  facilityId?: number;

  @ApiProperty({
    description: propertyMetadata.programCodeInfo.description,
    example: propertyMetadata.programCodeInfo.example,
    name: propertyMetadata.programCodeInfo.fieldLabels.value,
  })
  programCodeInfo: string;

  @ApiProperty({
    description: propertyMetadata.vintageYear.description,
    example: propertyMetadata.vintageYear.example,
    name: propertyMetadata.vintageYear.fieldLabels.value,
  })
  vintageYear?: number;

  @ApiProperty({
    description: propertyMetadata.totalBlock.description,
    example: propertyMetadata.totalBlock.example,
    name: propertyMetadata.totalBlock.fieldLabels.value,
  })
  totalBlock?: number;

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
    description: propertyMetadata.stateCode.description,
    example: propertyMetadata.stateCode.example,
    name: propertyMetadata.stateCode.fieldLabels.value,
  })
  stateCode: string;

  @ApiProperty({
    description: propertyMetadata.epaRegion.description,
    example: propertyMetadata.epaRegion.example,
    name: propertyMetadata.epaRegion.fieldLabels.value,
  })
  epaRegion?: number;

  @ApiProperty({
    description: propertyMetadata.ownerOperatorInfo.description,
    example: propertyMetadata.ownerOperatorInfo.example,
    name: propertyMetadata.ownerOperatorInfo.fieldLabels.value,
  })
  ownerOperator: string;

  @ApiProperty({
    description: propertyMetadata.accountType.description,
    example: propertyMetadata.accountType.example,
    name: propertyMetadata.accountType.fieldLabels.value,
  })
  accountType: string;
}
