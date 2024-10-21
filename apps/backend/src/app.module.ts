import { Module } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { Config } from './config/config';
import {
  ExceptionHandler,
  ExceptionHandlerModule,
} from './nestjs/errors/exceptionHandler';
import { ErrorHandler } from './nestjs/filter';
import { ConfigModuleFactory } from './config/config.module';

@Module({
  imports: [
    ConfigModuleFactory(Config),
    ExceptionHandlerModule.register(Config),
  ],
  providers: [
    { provide: APP_PIPE, useClass: ZodValidationPipe },
    {
      inject: [Config],
      provide: ExceptionHandler,
      useFactory: (cfg: Config) => new ExceptionHandler(cfg),
    },
    {
      provide: APP_FILTER,
      useClass: ErrorHandler,
    },
  ],
})
export class AppModule {}
