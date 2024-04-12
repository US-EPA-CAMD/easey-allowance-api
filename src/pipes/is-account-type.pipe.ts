import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { DbLookupValidator } from '@us-epa-camd/easey-common/validators';
import { ILike } from 'typeorm';

import { AccountTypeCode } from '../entities/account-type-code.entity';

export function IsAccountType(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isAccountType',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [
        {
          type: AccountTypeCode,
          ignoreEmpty: false,
          findOption: (args: ValidationArguments) => ({
            where: {
              accountTypeDescription: ILike(args.value),
            },
          }),
        },
      ],
      validator: DbLookupValidator,
    });
  };
}
