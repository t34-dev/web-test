import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const updateUserSchema = z.object({
  isProvider: z.boolean(),
});

export class UpdateUserDto extends createZodDto(updateUserSchema) {}

const userSchema = z.object({
  id: z.string(),
  clerkUserId: z.string(),
  isProvider: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export class UserDto extends createZodDto(userSchema) {}
