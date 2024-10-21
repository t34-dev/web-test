import { DynamicModule, Type } from '@nestjs/common';

export function makeServicesGlobal(services: Type<unknown>[]): DynamicModule[] {
  return services.map(v => ({
    module: class {
      public name = v.name + 'GlobalModule';
    },
    global: true,
    providers: [v],
    exports: [v],
  }));
}
