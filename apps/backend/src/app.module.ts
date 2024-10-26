import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
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
import { ProxyModule } from './proxy/proxy.module';
import { WalletModule } from './wallet/wallet.module';
import { DenyAllGuard } from './auth/denyAll.guard';
import { clerkMiddleware } from '@clerk/express';

@Module({
  imports: [
    ConfigModuleFactory(Config),
    ExceptionHandlerModule.register(Config),
    ...makeModulesGlobal(
      [
        PrismaModule,
        UserModule,
        ProviderKeyModule,
        ClientKeyModule,
        ProxyModule,
        WalletModule,
      ],
      [],
    ),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: DenyAllGuard,
    },
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
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(clerkMiddleware()).forRoutes('*');
  }
}
