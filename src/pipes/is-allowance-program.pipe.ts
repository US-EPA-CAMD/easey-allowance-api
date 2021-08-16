import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { getManager } from 'typeorm';

import { ProgramCode } from '../entities/program-code.entity';

export function IsAllowanceProgram(
  isActiveOnly: boolean,
  validationOptions?: ValidationOptions,
) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isAllowanceProgram',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        async validate(value: any, args: ValidationArguments) {
          const manager = getManager();
          let found;
          if (isActiveOnly) {
            found = await manager.findOne(ProgramCode, {
              programCode: value.toUpperCase(),
              allowanceUIFilter: 1,
              tradingEndDate: null,
            });
          } else {
            found = await manager.findOne(ProgramCode, {
              programCode: value.toUpperCase(),
              allowanceUIFilter: 1,
            });
          }
          return found != null;
        },
      },
    });
  };
}
