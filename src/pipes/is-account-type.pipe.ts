import { registerDecorator, ValidationOptions } from 'class-validator';

import { IsAccountTypeValidator } from '../validators/is-account-type.validator';

export function IsAccountType(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isAccountType',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsAccountTypeValidator,
    });
  };
}
