import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { EntityManager, ILike } from 'typeorm';

import { TransactionTypeCode } from '../entities/transaction-type-code.entity';

@Injectable()
@ValidatorConstraint({ name: 'isTransactionType', async: true })
export class IsTransactionTypeValidator
  implements ValidatorConstraintInterface {
  constructor(private readonly entityManager: EntityManager) {}

  async validate(value: any, _args: ValidationArguments) {
    const found = await this.entityManager.findOneBy(TransactionTypeCode, {
      transactionTypeDescription: ILike(value),
    });

    return found != null;
  }
}
