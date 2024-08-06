import { registerDecorator, ValidationOptions } from 'class-validator';

import { IsAllowanceProgramValidator } from '../validators/is-allowance-program.validator';

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
      constraints: [{ isActiveOnly }],
      validator: IsAllowanceProgramValidator,
    });
  };
}
