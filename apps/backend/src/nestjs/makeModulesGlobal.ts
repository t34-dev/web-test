import { DynamicModule, Type } from '@nestjs/common';

export function makeModulesGlobal(
  modules: Type<unknown>[],
  dynamicModules: DynamicModule[],
): DynamicModule[] {
  return [
    ...modules.map(v => ({
      global: true,
      exports: [v],
      module: v,
    })),
    ...dynamicModules.map(v => ({
      ...v,
      global: true,
    })),
  ];
}
