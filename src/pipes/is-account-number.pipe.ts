import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  isAlphanumeric,
} from 'class-validator';

export function IsAccountNumber(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isAccountNumber',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return isAlphanumeric(value) && value.length === 12;
        },
      },
    });
  };
}
