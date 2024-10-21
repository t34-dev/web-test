import { Injectable } from '@nestjs/common';
import { ClassConstructor, Transform } from 'class-transformer';
import { IsBoolean, IsDefined, IsPort } from 'class-validator';
import { selectConfig } from 'nest-typed-config';

import { ConfigModuleFactory } from './config.module';

@Injectable()
export class Config {
  @IsPort() public readonly PORT!: string;

  @IsDefined()
  @Transform(({ value }) => {
    switch (value) {
      case 'true':
        return true;
      case 'false':
        return false;
      default:
        throw new Error('Invalid value for ERRORS_WITH_STACKTRACE');
    }
  })
  @IsBoolean()
  public readonly ERRORS_WITH_STACKTRACE!: boolean;

  public static normalize(
    config: Record<string, unknown>,
  ): Record<string, unknown> {
    return config;
  }
}

export function getConfig<T extends typeof Config>(configSchema: T): T {
  return selectConfig(
    ConfigModuleFactory(configSchema),
    configSchema as unknown as ClassConstructor<T>,
  );
}
