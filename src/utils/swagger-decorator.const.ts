import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiQuery,
} from '@nestjs/swagger';

export const BadRequestResponse = () =>
  ApiBadRequestResponse({
    description: 'Invalid Request',
  });

export const NotFoundResponse = () =>
  ApiNotFoundResponse({
    description: 'Resource Not Found',
  });

export const ApiQueryMultiSelect = () => {
  return applyDecorators(
    ApiQuery({ style: 'pipeDelimited', name: 'accountType', required: false, explode: false }),
    ApiQuery({ style: 'pipeDelimited', name: 'vintageYear', required: false, explode: false }),
    ApiQuery({ style: 'pipeDelimited', name: 'accountNumber', required: false, explode: false }),
    ApiQuery({ style: 'pipeDelimited', name: 'orisCode', required: false, explode: false }),
    ApiQuery({ style: 'pipeDelimited', name: 'ownerOperator', required: false, explode: false }),
    ApiQuery({ style: 'pipeDelimited', name: 'state', required: false, explode: false }),
    ApiQuery({ style: 'pipeDelimited', name: 'program', required: false, explode: false }),
  );
}
