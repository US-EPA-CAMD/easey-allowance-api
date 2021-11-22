import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

/**
 * This decorator takes in a min date and max date as a parameter (YYYY-MM-DD format)
 * The date range is the min date -> max date inclusive
 */
export function IsInDateRange(
  property: [Date, string],
  validationOptions?: ValidationOptions,
) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isInDateRange',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const minDate = args.constraints[0][0];
          const maxDate = (args.object as Date)[args.constraints[0][1]];
          const dateObject = new Date(value);

          return dateObject >= minDate && dateObject <= maxDate;
        },
      },
    });
  };
}
