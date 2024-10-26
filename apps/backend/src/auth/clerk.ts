import { getAuth } from '@clerk/express';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export type ClerkUserType = ReturnType<typeof getClerkAuth>;
export const ClerkUser = createParamDecorator(getClerkAuth);

export type ClerkUserIdType = ReturnType<typeof getClerkAuth>['userId'];
export const ClerkUserId = createParamDecorator(getClerkUserId);

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

function getClerkUserId(
  _: undefined,
  context: ExecutionContext,
): ClerkUserIdType {
  const clerkAuthUser = getClerkAuth(_, context);
  return clerkAuthUser.userId;
}
