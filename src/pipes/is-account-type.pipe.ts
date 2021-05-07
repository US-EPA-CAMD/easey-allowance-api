import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
  } from 'class-validator';
  
  import { getManager } from 'typeorm';
import { AccountType } from '../entities/account-type-code.entity';
  
  
  export function IsAccountType(validationOptions?: ValidationOptions) {
    return function(object: Object, propertyName: string) {
      registerDecorator({
        name: 'isAccountType',
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        validator: {
          async validate(value: any, args: ValidationArguments) {
            const manager = getManager();
  
            const found = await manager.findOne(AccountType, {
              accountTypeDescription: value.toUpperCase(),
            });
            return found != null;
          },
        },
      });
    };
  }
  