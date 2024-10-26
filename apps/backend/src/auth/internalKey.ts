import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  Injectable,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { type Request } from 'express';
import { Config } from '../config/config';
import { BypassDenyAll } from './bypassDenyAll.decorator';

export const internalKeyHeader = 'X-Therpc-Internal-Key';
export type InternalKeyType = string;
export const InternalKey = () => Headers(internalKeyHeader);

@Injectable()
export class InternalKeyGuard implements CanActivate {
  public constructor(private readonly config: Config) {}

  public canActivate(context: ExecutionContext): boolean {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const internalKey = request.get(internalKeyHeader);
    return internalKey === this.config.INTERNAL_API_KEY;
  }
}

export function UseInternalKeyGuard() {
  return applyDecorators(BypassDenyAll, UseGuards(InternalKeyGuard));
}
