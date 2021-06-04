import {
  ApiTags,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiExtraModels,
} from '@nestjs/swagger';
import { Get, Controller } from '@nestjs/common';

import { AccountDTO } from '../dto/account.dto';
import { AccountService } from './account.service';

@ApiTags('Accounts')
@Controller()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  @ApiExtraModels(AccountDTO)
  @ApiOkResponse({
    description: 'Retrieved All Valid Accounts',
  })
  @ApiBadRequestResponse({
    description: 'Invalid Request',
  })
  @ApiNotFoundResponse({
    description: 'Resource Not Found',
  })
  getAllAccounts(): Promise<AccountDTO[]> {
    return this.accountService.getAllAccounts();
  }
}
