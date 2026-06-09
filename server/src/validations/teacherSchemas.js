import { z } from 'zod';

export const teacherSchema = z.object({
  user_id: z.string().uuid().optional().or(z.literal('')),
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().optional().or(z.literal('')),
  degree: z.string().optional().or(z.literal('')),
  active: z.boolean().default(true)
});
