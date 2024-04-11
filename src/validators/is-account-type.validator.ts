import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { EntityManager, ILike } from 'typeorm';

import { AccountTypeCode } from '../entities/account-type-code.entity';

@Injectable()
@ValidatorConstraint({ name: 'isAccountType', async: true })
export class IsAccountTypeValidator implements ValidatorConstraintInterface {
  constructor(private readonly entityManager: EntityManager) {}

  async validate(value: any, _args: ValidationArguments) {
    const found = await this.entityManager.findOneBy(AccountTypeCode, {
      accountTypeDescription: ILike(value),
    });

    return found != null;
  }
}
