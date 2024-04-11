import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { EntityManager } from 'typeorm';

import { StateCode } from '../entities/state-code.entity';

@Injectable()
@ValidatorConstraint({ name: 'isStateCode', async: true })
export class IsStateCodeValidator implements ValidatorConstraintInterface {
  constructor(private readonly entityManager: EntityManager) {}

  async validate(value: any, _args: ValidationArguments) {
    const found = await this.entityManager.findOneBy(StateCode, {
      stateCd: value.toUpperCase(),
    });
    return found != null;
  }
}
