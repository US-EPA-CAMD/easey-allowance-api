import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

import { AllowanceProgram } from '../enum/allowance-programs.enum';
import { ComplianceParamsDTO } from './compliance.params.dto';

export class AllowanceComplianceParamsDTO extends ComplianceParamsDTO {
  @IsOptional()
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  program?: AllowanceProgram[];
}
