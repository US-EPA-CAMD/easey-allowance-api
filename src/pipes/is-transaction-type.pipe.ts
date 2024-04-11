import { registerDecorator, ValidationOptions } from 'class-validator';

import { IsTransactionTypeValidator } from '../validators/is-transaction-type.validator';

export function IsTransactionType(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isTransactionType',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsTransactionTypeValidator,
    });
  };
}
