import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const clientKeySchema = z.object({});

export class ClientKeyDto extends createZodDto(clientKeySchema) {}
