import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { CustomError } from './custom-error';

@Catch(Error, HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error | HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if ('statusCode' in exception && 'code' in exception) {
      const customError = exception as CustomError;
      return response.status(customError.statusCode).json({
        statusCode: customError.statusCode,
        message: customError.message,
        code: customError.code,
      });
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      return response.status(status).json({
        statusCode: status,
        message: typeof exceptionResponse === 'string' ? exceptionResponse : (exceptionResponse as any).message,
      });
    }

    console.error(exception);
    return response.status(500).json({
      statusCode: 500,
      message: 'Internal server error',
    });
  }
}