import { Injectable } from '@nestjs/common';
import { ClassConstructor, Transform } from 'class-transformer';
import { IsBoolean, IsDefined, IsPort, IsString } from 'class-validator';
import { selectConfig } from 'nest-typed-config';

import { ConfigModuleFactory } from './config.module';

@Injectable()
export class Config {
  @IsString()
  public readonly INTERNAL_API_KEY!: string;

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
  public readonly WITH_SEED!: boolean;

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
  public readonly HELMET_ENABLED!: boolean;

  @IsPort()
  public readonly PORT!: string;

  @IsString()
  public readonly CLERK_SECRET_KEY!: string;

  @IsString()
  public readonly CLERK_PUBLISHABLE_KEY!: string;

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
