import { getAuth } from '@clerk/express';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export type ClerkUser = ReturnType<typeof getClerkAuth>;
export const Auth = createParamDecorator(getClerkAuth);

export type ClerkUserId = ReturnType<typeof getClerkAuth>['userId'];
export const AuthUserId = createParamDecorator(getClerkUserId);

function getClerkAuth(
  _: undefined,
  context: ExecutionContext,
): { userId: string; sessionId: string } {
  const request = context.switchToHttp().getRequest();
  const auth = getAuth(request);
  if (auth.userId === null) {
    throw new Error('User is not authenticated');
  }
  return auth;
}

function getClerkUserId(_: undefined, context: ExecutionContext): ClerkUserId {
  const clerkAuthUser = getClerkAuth(_, context);
  return clerkAuthUser.userId;
}
