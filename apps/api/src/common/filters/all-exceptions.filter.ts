import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AbstractHttpAdapter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapter: AbstractHttpAdapter) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this;
    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = 'Internal server error';
    let data: unknown = null;

    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      if (typeof response === 'object' && response !== null) {
        const resObj = response as Record<string, unknown>;
        message =
          (resObj.message as string) || (resObj.error as string) || message;
        data = response;
      } else if (typeof response === 'string') {
        message = response;
      }
    } else if (exception instanceof Error) {
      // Optional: log or handle standard errors
      message = exception.message || message;
    }

    const responseBody = {
      statusCode: httpStatus,
      message,
      data,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
