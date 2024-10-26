import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BypassDenyAllInternal } from './bypassDenyAll.decorator';

@Injectable()
export class DenyAllGuard implements CanActivate {
  public constructor(private readonly reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean {
    const bypassDenyAllHandler =
      this.reflector.get<boolean>(
        BypassDenyAllInternal,
        context.getHandler(),
      ) ?? false;

    const bypassDenyAllClass =
      this.reflector.get<boolean>(BypassDenyAllInternal, context.getClass()) ??
      false;
    return bypassDenyAllHandler || bypassDenyAllClass;
  }
}
