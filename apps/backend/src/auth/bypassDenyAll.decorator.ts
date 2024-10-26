import { Reflector } from '@nestjs/core';

export const BypassDenyAllInternal = Reflector.createDecorator<boolean>();
export const BypassDenyAll = BypassDenyAllInternal(true);
