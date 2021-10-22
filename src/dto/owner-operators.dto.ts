import { ApiProperty } from '@nestjs/swagger';
import { propertyMetadata } from '@us-epa-camd/easey-common/constants';

export class OwnerOperatorsDTO {
  @ApiProperty({
    description: propertyMetadata.ownerOperator.description,
    example: propertyMetadata.ownerOperator.example,
    name: propertyMetadata.ownerOperator.fieldLabels.value,
  })
  ownerOperator: string;

  @ApiProperty({
    description: propertyMetadata.ownType.description,
    example: propertyMetadata.ownType.example,
    name: propertyMetadata.ownType.fieldLabels.value,
  })
  ownType: string;
}
