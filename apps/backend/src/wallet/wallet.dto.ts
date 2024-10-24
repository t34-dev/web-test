import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const walletSchema = z.object({
  id: z.string(),
  message: z.object({
    types: z.object({
      Message: z.tuple([
        z.object({ name: z.literal('content'), type: z.literal('string') }),
        z.object({ name: z.literal('timestamp'), type: z.literal('string') }),
      ]),
    }),
    primaryType: z.string(),
    domain: z.object({
      name: z.string(),
      version: z.string(),
      salt: z.string(),
    }),
    message: z.object({
      content: z.string(),
      nonce: z.string(),
    }),
  }),
  signature: z.string().nullable(),
  address: z.string().nullable(),
});

export class WalletDto extends createZodDto(walletSchema) {}

const updateWalletBodySchema = z.object({
  signature: z.string(),
});
const updateWalletParamsSchema = z.object({
  id: z.string(),
});

export class UpdateWalletBodyDto extends createZodDto(updateWalletBodySchema) {}
export class UpdateWalletParamsDto extends createZodDto(
  updateWalletParamsSchema,
) {}
