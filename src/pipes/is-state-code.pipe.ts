import { registerDecorator, ValidationOptions } from 'class-validator';

import { IsStateCodeValidator } from '../validators/is-state-code.validator';

export function IsStateCode(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isStateCode',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsStateCodeValidator,
    });
  };
}
