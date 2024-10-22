import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const createProxySchema = z.object({
  providerProxyId: z.string().uuid(),
  providerProxyName: z.string(),
  url: z.string().url(),
});

export class CreateProxyDto extends createZodDto(createProxySchema) {}

const proxySchema = createProxySchema.extend({
  id: z.string(),
});

export class ProxyDto extends createZodDto(proxySchema) {}
