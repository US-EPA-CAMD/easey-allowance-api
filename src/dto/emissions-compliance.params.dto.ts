import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

import { ComplianceParamsDTO } from './compliance.params.dto';

export class EmissionsComplianceParamsDTO extends ComplianceParamsDTO {
  @IsOptional()
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  year?: number[];
}
