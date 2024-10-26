import {
  Headers,
  applyDecorators,
  CanActivate,
  ExecutionContext,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { BypassDenyAll } from './bypassDenyAll.decorator';
import { type Request } from 'express';

export const providerKeyHeader = 'X-Therpc-Provider-Key';
export type ProviderKeyType = string;
export const ProviderKey = () => Headers(providerKeyHeader);

@Injectable()
class ProviderKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const providerKey = request.header(providerKeyHeader);
    return providerKey !== undefined;
  }
}

export function UseProviderKeyGuard() {
  return applyDecorators(BypassDenyAll, UseGuards(ProviderKeyGuard));
}
