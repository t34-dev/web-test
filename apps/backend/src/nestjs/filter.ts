import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { type Response } from 'express';

import { ExceptionHandler } from './errors/exceptionHandler';

@Catch()
export class ErrorHandler implements ExceptionFilter<unknown> {
  public constructor(private readonly exceptionHandler: ExceptionHandler) {}

  public catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const [statusCode, errResponse] = this.exceptionHandler.handle(exception);
    response.status(statusCode).json(errResponse);
  }
}
