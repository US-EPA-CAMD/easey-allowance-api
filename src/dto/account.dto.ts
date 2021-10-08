import { ApiProperty } from '@nestjs/swagger';
import { propertyMetadata } from '@us-epa-camd/easey-constants/lib';

export class AccountDTO {
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
}
