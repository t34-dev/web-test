import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const clientKeySchema = z.object({});

export class ClientKeyDto extends createZodDto(clientKeySchema) {}

const deleteClientKeyParamsSchema = z.object({
  id: z.string(),
});

export class DeleteClientKeyParamsDto extends createZodDto(
  deleteClientKeyParamsSchema,
) {}
