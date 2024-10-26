import { getAuth } from '@clerk/express';
import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  Injectable,
  UseGuards,
  createParamDecorator,
} from '@nestjs/common';
import { BypassDenyAll } from './bypassDenyAll.decorator';

export type ClerkUserType = ReturnType<typeof getClerkAuth>;
export const ClerkUser = createParamDecorator(getClerkAuth);

export type ClerkUserIdType = ReturnType<typeof getClerkAuth>['userId'];
export type ClerkUserIdNullableType = ReturnType<
  typeof getClerkAuthNullable
>['userId'];
export const ClerkUserId = createParamDecorator(getClerkUserId);
export const ClerkUserIdNullable = createParamDecorator(getClerkUserIdNullable);

function getClerkAuthNullable(_: undefined, context: ExecutionContext) {
  const request = context.switchToHttp().getRequest();
  const auth = getAuth(request);
  return auth;
}

function getClerkAuth(
  _: undefined,
  context: ExecutionContext,
): { userId: string; sessionId: string } {
  const auth = getClerkAuthNullable(_, context);
  if (auth.userId === null) {
    throw new Error('User is not authenticated');
  }
  return auth;
}

function getClerkUserId(
  _: undefined,
  context: ExecutionContext,
): ClerkUserIdType {
  const clerkAuthUser = getClerkAuth(_, context);
  return clerkAuthUser.userId;
}

function getClerkUserIdNullable(
  _: undefined,
  context: ExecutionContext,
): ClerkUserIdType | null {
  const auth = getClerkAuthNullable(_, context);
  if (auth.userId === null) {
    return null;
  }
  return auth.userId;
}

@Injectable()
export class ClerkGuard implements CanActivate {
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
