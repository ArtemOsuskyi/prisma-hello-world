import { z } from 'zod';

export const UserCreateSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    firstName: z.string(),
    lastName: z.string(),
  })
  .strict();
