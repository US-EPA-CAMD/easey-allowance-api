import { ApiProperty } from '@nestjs/swagger';
import { propertyMetadata } from '@us-epa-camd/easey-common/constants';

export class ApplicableAccountAttributesDTO {
  @ApiProperty({
    description: propertyMetadata.programCode.description,
    example: propertyMetadata.programCode.example,
    name: propertyMetadata.programCode.fieldLabels.value,
  })
  programCode: string;

  @ApiProperty({
    description: propertyMetadata.facilityId.description,
    example: propertyMetadata.facilityId.example,
    name: propertyMetadata.facilityId.fieldLabels.value,
  })
  facilityId: number;

  @ApiProperty({
    description: propertyMetadata.state.description,
    example: propertyMetadata.state.example,
    name: propertyMetadata.state.fieldLabels.value,
  })
  state: string;

  @ApiProperty({
    description: propertyMetadata.accountNumber.description,
    example: propertyMetadata.accountNumber.example,
    name: propertyMetadata.accountNumber.fieldLabels.value,
  })
  accountNumber: string;

  @ApiProperty({
    description: propertyMetadata.accountType.description,
    example: propertyMetadata.accountType.example,
    name: propertyMetadata.accountType.fieldLabels.value,
  })
  accountType: string;

  @ApiProperty({
    description: propertyMetadata.ownerOperator.description,
    example: propertyMetadata.ownerOperator.example,
    name: propertyMetadata.ownerOperator.fieldLabels.value,
  })
  ownerOperator: string;
}
