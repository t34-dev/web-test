import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const providerKeySchema = z.object({});

export class ProviderKeyDto extends createZodDto(providerKeySchema) {}
