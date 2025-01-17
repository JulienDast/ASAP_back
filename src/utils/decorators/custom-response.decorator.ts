import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CustomError } from '../exceptions/custom-error';

export function ApiCustomResponses(errors: CustomError[]) {
  return applyDecorators(
    ...errors.map(error =>
      ApiResponse({
        status: error.statusCode,
        description: error.message,
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'number', example: error.statusCode },
            message: { type: 'string', example: error.message },
            code: { type: 'string', example: error.code }
          }
        }
      })
    )
  );
}