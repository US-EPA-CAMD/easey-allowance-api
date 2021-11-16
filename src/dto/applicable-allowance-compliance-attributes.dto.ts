import { ApiProperty } from '@nestjs/swagger';
import { propertyMetadata } from '@us-epa-camd/easey-common/constants';

export class ApplicableAllowanceComplianceAttributesDTO {
  @ApiProperty({
    description: propertyMetadata.year.description,
    example: propertyMetadata.year.example,
    name: propertyMetadata.year.fieldLabels.value,
  })
  year?: number;

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
  facilityId?: number;

  @ApiProperty({
    description: propertyMetadata.state.description,
    example: propertyMetadata.state.example,
    name: propertyMetadata.state.fieldLabels.value,
  })
  state: string;

  @ApiProperty({
    description: propertyMetadata.ownerOperator.description,
    example: propertyMetadata.ownerOperator.example,
    name: propertyMetadata.ownerOperator.fieldLabels.value,
  })
  ownerOperator: string;
}
