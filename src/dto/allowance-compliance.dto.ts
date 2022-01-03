import { ApiProperty } from '@nestjs/swagger';
import { propertyMetadata } from '@us-epa-camd/easey-common/constants';

export class AllowanceComplianceDTO {
  @ApiProperty({
    description: propertyMetadata.programCodeInfo.description,
    example: propertyMetadata.programCodeInfo.example,
    name: propertyMetadata.programCodeInfo.fieldLabels.value,
  })
  programCodeInfo: string;

  @ApiProperty({
    description: propertyMetadata.year.description,
    example: propertyMetadata.year.example,
    name: propertyMetadata.year.fieldLabels.value,
  })
  year?: number;

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
    description: propertyMetadata.unitsAffected.description,
    example: propertyMetadata.unitsAffected.example,
    name: propertyMetadata.unitsAffected.fieldLabels.value,
  })
  unitsAffected: string;

  @ApiProperty({
    description: propertyMetadata.allocated.description,
    example: propertyMetadata.allocated.example,
    name: propertyMetadata.allocated.fieldLabels.value,
  })
  allocated?: number;

  @ApiProperty({
    description: propertyMetadata.bankedHeld.description,
    example: propertyMetadata.bankedHeld.example,
    name: propertyMetadata.bankedHeld.fieldLabels.value,
  })
  bankedHeld?: number;

  @ApiProperty({
    description: propertyMetadata.currentHeld.description,
    example: propertyMetadata.currentHeld.example,
    name: propertyMetadata.currentHeld.fieldLabels.value,
  })
  currentHeld?: number;

  @ApiProperty({
    description: propertyMetadata.totalAllowancesHeld.description,
    example: propertyMetadata.totalAllowancesHeld.example,
    name: propertyMetadata.totalAllowancesHeld.fieldLabels.value,
  })
  totalAllowancesHeld?: number;

  @ApiProperty({
    description: propertyMetadata.complianceYearEmissions.description,
    example: propertyMetadata.complianceYearEmissions.example,
    name: propertyMetadata.complianceYearEmissions.fieldLabels.value,
  })
  complianceYearEmissions?: number;

  @ApiProperty({
    description: propertyMetadata.otherDeductions.description,
    example: propertyMetadata.otherDeductions.example,
    name: propertyMetadata.otherDeductions.fieldLabels.value,
  })
  otherDeductions?: number;

  @ApiProperty({
    description: propertyMetadata.totalRequiredDeductions.description,
    example: propertyMetadata.totalRequiredDeductions.example,
    name: propertyMetadata.totalRequiredDeductions.fieldLabels.value,
  })
  totalRequiredDeductions?: number;

  @ApiProperty({
    description: propertyMetadata.currentDeductions.description,
    example: propertyMetadata.currentDeductions.example,
    name: propertyMetadata.currentDeductions.fieldLabels.value,
  })
  currentDeductions?: number;

  @ApiProperty({
    description: propertyMetadata.deductOneToOne.description,
    example: propertyMetadata.deductOneToOne.example,
    name: propertyMetadata.deductOneToOne.fieldLabels.value,
  })
  deductOneToOne?: number;

  @ApiProperty({
    description: propertyMetadata.deductTwoToOne.description,
    example: propertyMetadata.deductTwoToOne.example,
    name: propertyMetadata.deductTwoToOne.fieldLabels.value,
  })
  deductTwoToOne?: number;

  @ApiProperty({
    description: propertyMetadata.totalAllowancesDeducted.description,
    example: propertyMetadata.totalAllowancesDeducted.example,
    name: propertyMetadata.totalAllowancesDeducted.fieldLabels.value,
  })
  totalAllowancesDeducted?: number;

  @ApiProperty({
    description: propertyMetadata.carriedOver.description,
    example: propertyMetadata.carriedOver.example,
    name: propertyMetadata.carriedOver.fieldLabels.value,
  })
  carriedOver?: number;

  @ApiProperty({
    description: propertyMetadata.excessEmissions.description,
    example: propertyMetadata.excessEmissions.example,
    name: propertyMetadata.excessEmissions.fieldLabels.value,
  })
  excessEmissions?: number;

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
}
