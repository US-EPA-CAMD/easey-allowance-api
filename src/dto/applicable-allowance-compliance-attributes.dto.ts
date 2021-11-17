import { ApiProperty } from '@nestjs/swagger';
import { propertyMetadata } from '@us-epa-camd/easey-common/constants';

import { ApplicableComplianceAttributesDTO } from './applicable-compliance-attributes.dto';

export class ApplicableAllowanceComplianceAttributesDTO extends ApplicableComplianceAttributesDTO {
  @ApiProperty({
    description: propertyMetadata.programCode.description,
    example: propertyMetadata.programCode.example,
    name: propertyMetadata.programCode.fieldLabels.value,
  })
  programCode: string;
}
