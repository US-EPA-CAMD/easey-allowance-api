import {
  ApiTags,
  ApiOkResponse,
  ApiExtraModels,
  getSchemaPath,
} from '@nestjs/swagger';
import { Get, Controller, Query, Req, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';

import { Json2CsvInterceptor } from '../interceptors/json2csv.interceptor';
import {
  BadRequestResponse,
  NotFoundResponse,
  ApiQueryMultiSelect,
} from '../utils/swagger-decorator.const';
import { AccountService } from './account.service';
import { AccountDTO } from '../dto/account.dto';
import { OwnerOperatorsDTO } from '../dto/owner-operators.dto';
import { AccountAttributesDTO } from '../dto/account-attributes.dto';
import { AccountAttributesParamsDTO } from '../dto/account-attributes.params.dto';

@ApiTags('Accounts')
@UseInterceptors(Json2CsvInterceptor)
@Controller()
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
        },
      },
    },
  })
  @BadRequestResponse()
  @NotFoundResponse()
  @ApiQueryMultiSelect()
  @ApiExtraModels(AccountAttributesDTO)
  getAllAccountAttributes(
    @Query() accountAttributesParamsDTO: AccountAttributesParamsDTO,
    @Req() req: Request,
  ): Promise<AccountAttributesDTO[]> {
    return this.accountService.getAllAccountAttributes(
      accountAttributesParamsDTO,
      req,
    );
  }

  @Get('owner-operators')
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
