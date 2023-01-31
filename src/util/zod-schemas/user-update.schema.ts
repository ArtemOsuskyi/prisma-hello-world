import { z } from 'zod';

export const UserUpdateSchema = z
  .object({
    firstName: z.string().max(30, 'Name is too long'),
    lastName: z.string().max(30, 'Last name is too long'),
  })
  .strict();
