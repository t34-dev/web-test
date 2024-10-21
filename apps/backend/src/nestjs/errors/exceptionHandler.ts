import {
  DynamicModule,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  Module,
  Type,
} from '@nestjs/common';
import { ZodValidationException } from 'nestjs-zod';

import { KnownException } from './knownException';
import { Config } from '../../config/config';

type ErrorResponse = {
  cause?: ErrorResponse;
  errors?: unknown[];
  message: string;
  logMessage?: string;
  stacktrace?: string;
};

@Module({})
export class ExceptionHandler {
  public constructor(private readonly config: Config) {}

  public handle(exception: unknown): [HttpStatus, ErrorResponse] {
    return this.internalHandle(exception, true);
  }

  private internalHandle(
    exception: unknown,
    withLogs: boolean,
  ): [HttpStatus, ErrorResponse] {
    let status: HttpStatus;
    let errResponse: ErrorResponse;
    if (exception instanceof ZodValidationException) {
      [status, errResponse] = this.handleZodValidationException(exception);
    } else if (exception instanceof HttpException) {
      [status, errResponse] = this.handleHttpException(exception);
    } else if (exception instanceof KnownException) {
      [status, errResponse] = this.handleKnownException(exception);
    } else if (exception instanceof Error) {
      [status, errResponse] = this.handleError(exception);
    } else {
      [status, errResponse] = this.notErrorException(exception);
    }
    const errResponseWithStacktrace = {
      ...errResponse,
      message: errResponse.logMessage,
    };
    delete errResponseWithStacktrace.logMessage;
    if (withLogs) {
      if (exception instanceof KnownException) {
        Logger.log(errResponseWithStacktrace);
      } else {
        Logger.error(errResponseWithStacktrace);
      }
    }
    if (!this.config.ERRORS_WITH_STACKTRACE) {
      delete errResponse.stacktrace;
      delete errResponse.logMessage;
    }
    return [status, errResponse];
  }

  private handleZodValidationException(
    err: ZodValidationException,
  ): [HttpStatus, ErrorResponse] {
    return [
      HttpStatus.BAD_REQUEST,
      {
        errors: err.getZodError().errors,
        ...(err.cause
          ? { cause: this.internalHandle(err.cause, false)[1] }
          : null),
        message: err.message,
        ...(err.stack && { stacktrace: err.stack }),
      },
    ];
  }

  private handleHttpException(err: HttpException): [HttpStatus, ErrorResponse] {
    return [
      err.getStatus(),
      {
        ...(err.cause
          ? { cause: this.internalHandle(err.cause, false)[1] }
          : null),
        message: err.message,
        ...(err.stack && { stacktrace: err.stack }),
      },
    ];
  }

  private handleKnownException(
    err: KnownException,
  ): [HttpStatus, ErrorResponse] {
    return [
      err.statusCode,
      {
        ...(err.cause
          ? { cause: this.internalHandle(err.cause, false)[1] }
          : null),
        message: err.message,
        logMessage: err.message,
        ...(err.stack && { stacktrace: err.stack }),
      },
    ];
  }

  private handleError(err: Error): [HttpStatus, ErrorResponse] {
    return [
      HttpStatus.INTERNAL_SERVER_ERROR,
      {
        ...(err.cause
          ? { cause: this.internalHandle(err.cause, false)[1] }
          : null),
        message: err.message,
        logMessage: err.message,
        ...(err.stack && { stacktrace: err.stack }),
      },
    ];
  }

  private notErrorException(exception: unknown): [HttpStatus, ErrorResponse] {
    return [
      HttpStatus.INTERNAL_SERVER_ERROR,
      {
        message: String(exception),
        logMessage: String(exception),
      },
    ];
  }
}

@Injectable()
export class ExceptionHandlerModule {
  public static register(baseConfig: Type<Config>): DynamicModule {
    return {
      global: true,
      exports: [ExceptionHandler],
      module: ExceptionHandlerModule,
      providers: [
        {
          provide: ExceptionHandler,
          inject: [baseConfig],
          useFactory: (cfg: Config) => new ExceptionHandler(cfg),
        },
      ],
    };
  }
}
