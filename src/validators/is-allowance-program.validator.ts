import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { ProgramCode } from '../entities/program-code.entity';

@Injectable()
@ValidatorConstraint({ name: 'isAllowanceProgram', async: true })
export class IsAllowanceProgramValidator
  implements ValidatorConstraintInterface {
  constructor(private readonly entityManager: EntityManager) {}

  async validate(value: any, args: ValidationArguments) {
    const isActiveOnly = args.constraints[0];
    let found: ProgramCode | null;
    if (isActiveOnly) {
      found = await this.entityManager.findOneBy(ProgramCode, {
        programCode: value.toUpperCase(),
        allowanceUIFilter: 1,
        tradingEndDate: null,
      });
    } else {
      found = await this.entityManager.findOneBy(ProgramCode, {
        programCode: value.toUpperCase(),
        allowanceUIFilter: 1,
      });
    }
    return found != null;
  }
}
