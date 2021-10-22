import { ApiProperty } from '@nestjs/swagger';
import { propertyMetadata } from '@us-epa-camd/easey-common/constants';

export class AccountAttributesDTO {
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
    description: propertyMetadata.programCodeInfo.description,
    example: propertyMetadata.programCodeInfo.example,
    name: propertyMetadata.programCodeInfo.fieldLabels.value,
  })
  programCodeInfo: string;

  @ApiProperty({
    description: propertyMetadata.accountType.description,
    example: propertyMetadata.accountType.example,
    name: propertyMetadata.accountType.fieldLabels.value,
  })
  accountType: string;

  @ApiProperty({
    description: propertyMetadata.facilityId.description,
    example: propertyMetadata.facilityId.example,
    name: propertyMetadata.facilityId.fieldLabels.value,
  })
  facilityId?: number;

  @ApiProperty({
    description: propertyMetadata.unitId.description,
    example: propertyMetadata.unitId.example,
    name: propertyMetadata.unitId.fieldLabels.value,
  })
  unitId: string;

  @ApiProperty({
    description: propertyMetadata.ownerOperatorInfo.description,
    example: propertyMetadata.ownerOperatorInfo.example,
    name: propertyMetadata.ownerOperatorInfo.fieldLabels.value,
  })
  ownerOperator: string;

  @ApiProperty({
    description: propertyMetadata.state.description,
    example: propertyMetadata.state.example,
    name: propertyMetadata.state.fieldLabels.value,
  })
  state: string;

  @ApiProperty({
    description: propertyMetadata.epaRegion.description,
    example: propertyMetadata.epaRegion.example,
    name: propertyMetadata.epaRegion.fieldLabels.value,
  })
  epaRegion?: number;

  @ApiProperty({
    description: propertyMetadata.nercRegion.description,
    example: propertyMetadata.nercRegion.example,
    name: propertyMetadata.nercRegion.fieldLabels.value,
  })
  nercRegion: string;
}
