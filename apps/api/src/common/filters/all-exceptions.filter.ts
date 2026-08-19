import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapter: any) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this;
    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = 'Internal server error';
    let data: any = null;

    if (exception instanceof HttpException) {
      const response = exception.getResponse() as any;
      if (typeof response === 'object' && response !== null) {
        message = response.message || response.error || message;
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
