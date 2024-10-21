import { DynamicModule } from '@nestjs/common';
import { TypedConfigModule, dotenvLoader } from 'nest-typed-config';

import { Config } from './config';

export const ConfigModuleFactory = <T extends typeof Config>(
  schema: T,
): DynamicModule =>
  TypedConfigModule.forRoot({
    isGlobal: true,
    load: [dotenvLoader()],
    normalize: schema.normalize,
    schema,
  });
