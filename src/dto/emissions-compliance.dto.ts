import { ApiProperty } from '@nestjs/swagger';
import { propertyMetadata } from '@us-epa-camd/easey-common/constants';

export class EmissionsComplianceDTO {
  @ApiProperty({
    description: propertyMetadata.year.description,
    example: propertyMetadata.year.example,
    name: propertyMetadata.year.fieldLabels.value,
  })
  year?: number;

  @ApiProperty({
    description: propertyMetadata.facilityName.description,
    example: propertyMetadata.facilityName.example,
    name: propertyMetadata.facilityName.fieldLabels.value,
  })
  facilityName: string;

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
    description: propertyMetadata.stateCode.description,
    example: propertyMetadata.stateCode.example,
    name: propertyMetadata.stateCode.fieldLabels.value,
  })
  stateCode: string;

  @ApiProperty({
    description: propertyMetadata.complianceApproach.description,
    example: propertyMetadata.complianceApproach.example,
    name: propertyMetadata.complianceApproach.fieldLabels.value,
  })
  complianceApproach: string;

  @ApiProperty({
    description: propertyMetadata.avgPlanId.description,
    example: propertyMetadata.avgPlanId.example,
    name: propertyMetadata.avgPlanId.fieldLabels.value,
  })
  avgPlanId?: number;

  @ApiProperty({
    description: propertyMetadata.emissionsLimitDisplay.description,
    example: propertyMetadata.emissionsLimitDisplay.example,
    name: propertyMetadata.emissionsLimitDisplay.fieldLabels.value,
  })
  emissionsLimitDisplay?: number;

  @ApiProperty({
    description: propertyMetadata.actualEmissionsRate.description,
    example: propertyMetadata.actualEmissionsRate.example,
    name: propertyMetadata.actualEmissionsRate.fieldLabels.value,
  })
  actualEmissionsRate?: number;

  @ApiProperty({
    description: propertyMetadata.avgPlanActual.description,
    example: propertyMetadata.avgPlanActual.example,
    name: propertyMetadata.avgPlanActual.fieldLabels.value,
  })
  avgPlanActual?: number;

  @ApiProperty({
    description: propertyMetadata.inCompliance.description,
    example: propertyMetadata.inCompliance.example,
    name: propertyMetadata.inCompliance.fieldLabels.value,
  })
  inCompliance: string;
}
