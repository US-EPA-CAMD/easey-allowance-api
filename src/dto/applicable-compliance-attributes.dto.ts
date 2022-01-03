import { ApiProperty } from '@nestjs/swagger';
import { propertyMetadata } from '@us-epa-camd/easey-common/constants';

export class ApplicableComplianceAttributesDTO {
  @ApiProperty({
    description: propertyMetadata.year.description,
    example: propertyMetadata.year.example,
    name: propertyMetadata.year.fieldLabels.value,
  })
  year?: number;

  @ApiProperty({
    description: propertyMetadata.facilityId.description,
    example: propertyMetadata.facilityId.example,
    name: propertyMetadata.facilityId.fieldLabels.value,
  })
  facilityId?: number;

  @ApiProperty({
    description: propertyMetadata.stateCode.description,
    example: propertyMetadata.stateCode.example,
    name: propertyMetadata.stateCode.fieldLabels.value,
  })
  stateCode: string;

  @ApiProperty({
    description: propertyMetadata.ownerOperator.description,
    example: propertyMetadata.ownerOperator.example,
    name: propertyMetadata.ownerOperator.fieldLabels.value,
  })
  ownerOperator: string;
}
