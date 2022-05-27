import {
  ApiTags,
  ApiOkResponse,
  ApiExtraModels,
  getSchemaPath,
  ApiSecurity,
} from '@nestjs/swagger';
import { Get, Controller, Query, Req, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { Json2CsvInterceptor } from '@us-epa-camd/easey-common/interceptors';

import {
  BadRequestResponse,
  NotFoundResponse,
  ApiQueryMultiSelect,
} from '../utils/swagger-decorator.const';
import { AccountService } from './account.service';
import { AccountDTO } from '../dto/account.dto';
import { OwnerOperatorsDTO } from '../dto/owner-operators.dto';
import { AccountAttributesDTO } from '../dto/account-attributes.dto';
import { PaginatedAccountAttributesParamsDTO } from '../dto/account-attributes.params.dto';
import { ApplicableAccountAttributesDTO } from '../dto/applicable-account-attributes.dto';
import { fieldMappings } from '../constants/field-mappings';

@Controller()
@ApiSecurity('APIKey')
@ApiTags('Accounts')
@ApiExtraModels(AccountAttributesDTO)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  @ApiOkResponse({
    description: 'Retrieved All Valid Accounts',
  })
  @BadRequestResponse()
  @NotFoundResponse()
  @ApiExtraModels(AccountDTO)
  getAllAccounts(): Promise<AccountDTO[]> {
    return this.accountService.getAllAccounts();
  }

  @Get('attributes')
  @ApiOkResponse({
    description: 'Retrieved All Valid Account Attributes',
    content: {
      'application/json': {
        schema: {
          $ref: getSchemaPath(AccountAttributesDTO),
        },
      },
      'text/csv': {
        schema: {
          type: 'string',
          example: fieldMappings.allowances.accountAttributes.data
            .map(i => i.label)
            .join(','),
        },
      },
    },
  })
  @BadRequestResponse()
  @NotFoundResponse()
  @ApiQueryMultiSelect()
  @UseInterceptors(Json2CsvInterceptor)
  getAllAccountAttributes(
    @Query()
    paginatedAccountAttributesParamsDTO: PaginatedAccountAttributesParamsDTO,
    @Req() req: Request,
  ): Promise<AccountAttributesDTO[]> {
    return this.accountService.getAllAccountAttributes(
      paginatedAccountAttributesParamsDTO,
      req,
    );
  }

  @Get('attributes/applicable')
  @ApiExtraModels(ApplicableAccountAttributesDTO)
  @ApiOkResponse({
    description: 'Retrieved All Applicable Account Attributes',
  })
  @BadRequestResponse()
  @NotFoundResponse()
  @ApiExtraModels(ApplicableAccountAttributesDTO)
  getAllApplicableAccountAttributes(): Promise<
    ApplicableAccountAttributesDTO[]
  > {
    return this.accountService.getAllApplicableAccountAttributes();
  }

  @Get('owner-operators')
  @ApiExtraModels(OwnerOperatorsDTO)
  @ApiOkResponse({
    description: 'Retrieved All Valid Owner Operators',
  })
  @BadRequestResponse()
  @NotFoundResponse()
  @ApiExtraModels(OwnerOperatorsDTO)
  getAllOwnerOperators(): Promise<OwnerOperatorsDTO[]> {
    return this.accountService.getAllOwnerOperators();
  }
}
