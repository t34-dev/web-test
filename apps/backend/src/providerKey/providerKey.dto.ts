import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const providerKeySchema = z.object({
  id: z.string(),
  key: z.string(),
  deletedAt: z.date().nullable(),
});

export class ProviderKeyDto extends createZodDto(providerKeySchema) {}

const deleteProviderKeyParamsSchema = z.object({
  id: z.string(),
});

export class DeleteProviderKeyParamsDto extends createZodDto(
  deleteProviderKeyParamsSchema,
) {}
