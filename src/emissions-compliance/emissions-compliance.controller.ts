import { Get, Controller, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiExtraModels } from '@nestjs/swagger';

import { Json2CsvInterceptor } from '../interceptors/json2csv.interceptor';

import {
  BadRequestResponse,
  NotFoundResponse,
} from '../utils/swagger-decorator.const';
import { AllowanceComplianceService } from '../allowance-compliance/allowance-compliance.service';
import { OwnerOperatorsDTO } from '../dto/owner-operators.dto';

@Controller()
@ApiTags('Emissions Compliance')
@UseInterceptors(Json2CsvInterceptor)
export class EmissionsComplianceController {
  constructor(
    private readonly allowanceComplianceService: AllowanceComplianceService,
  ) {}

  @Get('owner-operators')
  @ApiOkResponse({
    description: 'Retrieved All Valid Owner Operators',
  })
  @BadRequestResponse()
  @NotFoundResponse()
  @ApiExtraModels(OwnerOperatorsDTO)
  getAllOwnerOperators(): Promise<OwnerOperatorsDTO[]> {
    return this.allowanceComplianceService.getAllOwnerOperators();
  }
}
