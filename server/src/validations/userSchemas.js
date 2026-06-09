import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['ADMIN', 'SECRETARIA', 'PROFESSOR']),
  active: z.boolean().default(true)
});

export const updateUserSchema = createUserSchema.partial().extend({
  password: z.string().min(6).optional()
});
