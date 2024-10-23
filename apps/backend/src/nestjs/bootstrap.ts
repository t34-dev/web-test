import { Logger, Type, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
import { patchNestJsSwagger } from 'nestjs-zod';

import helmet from 'helmet';
import { Config } from '../config/config';

patchNestJsSwagger();

// @ts-expect-error ignore
BigInt.prototype.toJSON = function (): string {
  return this.toString();
};

export async function bootstrap<T>(appModule: Type<T>): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(appModule);

  app.enableShutdownHooks();

  app.enableCors({
    origin: ['https://therpc.io'],
    credentials: true,
  });
  app.use(helmet());
  app.use(compression());
  app.enableVersioning({
    defaultVersion: '1',
    prefix: 'v',
    type: VersioningType.URI,
  });

  const swagger = new DocumentBuilder().addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('swagger', app, document);

  await app.init();

  const config = app.get(Config);

  await app.listen(config.PORT);
  Logger.log(`Listening on port http://localhost:${config.PORT}`);
}
