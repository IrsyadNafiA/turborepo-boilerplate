import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
export declare class AllExceptionsFilter implements ExceptionFilter {
    private readonly httpAdapter;
    constructor(httpAdapter: any);
    catch(exception: unknown, host: ArgumentsHost): void;
}
