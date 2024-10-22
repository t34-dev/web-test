import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { Config } from './config/config';
import {
  ExceptionHandler,
  ExceptionHandlerModule,
} from './nestjs/errors/exceptionHandler';
import { ErrorHandler } from './nestjs/filter';
import { ConfigModuleFactory } from './config/config.module';
import { makeModulesGlobal } from './nestjs/makeModulesGlobal';
import { UserModule } from './user/user.module';
import { ProviderKeyModule } from './providerKey';
import { PrismaModule } from './prisma/prisma.module';
import { ClientKeyModule } from './clientKey/clientKey.module';
import { ClerkExpressRequireAuth } from './clerk/clerkExpressRequireAuth.middleware';

@Module({
  imports: [
    ConfigModuleFactory(Config),
    ExceptionHandlerModule.register(Config),
    ...makeModulesGlobal(
      [PrismaModule, UserModule, ProviderKeyModule, ClientKeyModule],
      [],
    ),
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ClerkExpressRequireAuth()).forRoutes('*');
  }
}
