import { Headers } from '@nestjs/common';

export const providerKeyHeader = 'X-Therpc-Provider-Key';
export type ProviderKeyType = string;
export const ProviderKey = () => Headers(providerKeyHeader);
