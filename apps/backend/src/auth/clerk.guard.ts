import { getAuth } from '@clerk/express';
import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { BypassDenyAll } from './bypassDenyAll.decorator';

@Injectable()
class ClerkGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const auth = getAuth(request);
    return auth.userId !== null;
  }
}

export function UseClerkGuard() {
  return applyDecorators(BypassDenyAll, UseGuards(ClerkGuard));
}
