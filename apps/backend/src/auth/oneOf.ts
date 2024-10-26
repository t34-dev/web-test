import {
  applyDecorators,
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  Type,
  UseGuards,
} from '@nestjs/common';
import { BypassDenyAll } from './bypassDenyAll.decorator';
import { ClerkGuard } from './clerk';
import { InternalKeyGuard } from './internalKey';
import { Reflector } from '@nestjs/core';

const guardsInjector = Reflector.createDecorator<Type<CanActivate>[]>();

@Injectable()
export class OneOfGuard implements CanActivate {
  private readonly activeGuards: CanActivate[] = [];

  private isInitialized = false;

  constructor(
    private readonly clerkGuard: ClerkGuard,
    private readonly internalKeyGuard: InternalKeyGuard,
    private readonly reflector: Reflector,
  ) {}

  public init(context: ExecutionContext) {
    const classGuards =
      this.reflector.get(guardsInjector, context.getClass()) ?? [];
    const handlerGuards =
      this.reflector.get(guardsInjector, context.getHandler()) ?? [];
    const guards = [...new Set([...classGuards, ...handlerGuards])];

    const guardsMap = new Map<Type<CanActivate>, CanActivate>([
      [this.clerkGuard.constructor as Type<CanActivate>, this.clerkGuard],
      [
        this.internalKeyGuard.constructor as Type<CanActivate>,
        this.internalKeyGuard,
      ],
    ]);

    for (const guard of guards) {
      const guardInstance = guardsMap.get(guard);
      if (guardInstance === undefined) {
        throw new Error(`Guard ${guard.name} is not supported`);
      }
      this.activeGuards.push(guardInstance);
    }

    this.isInitialized = true;
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    if (this.isInitialized === false) {
      this.init(context);
    }

    const canActivates = this.activeGuards.map(guard => {
      const canActivate = guard.canActivate(context);
      if (typeof canActivate !== 'boolean') {
        throw new Error();
      }
      return canActivate;
    });
    const canActivateCounter = canActivates.reduce(
      (acc, canActivate) => acc + Number(canActivate),
      0,
    );
    if (canActivateCounter > 1) {
      throw new BadRequestException(
        'Only one authentication method is allowed',
      );
    }
    return canActivateCounter === 1;
  }
}

export function UseOneOfGuard(...guards: Type<CanActivate>[]) {
  return applyDecorators(
    BypassDenyAll,
    guardsInjector(guards),
    UseGuards(OneOfGuard),
  );
}
