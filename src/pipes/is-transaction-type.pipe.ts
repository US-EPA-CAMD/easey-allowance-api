import { DbLookupValidator } from '@us-epa-camd/easey-common/validators';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { ILike } from 'typeorm';

import { TransactionTypeCode } from '../entities/transaction-type-code.entity';

export function IsTransactionType(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isTransactionType',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [
        {
          type: TransactionTypeCode,
          ignoreEmpty: false,
          findOption: (args: ValidationArguments) => ({
            where: {
              transactionTypeDescription: ILike(args.value),
            },
          }),
        },
      ],
      validator: DbLookupValidator,
    });
  };
}
