import { z } from 'zod';

export const classSchema = z.object({
  code: z.string().min(2),
  name: z.string().min(3),
  course: z.string().min(3),
  semester: z.string().min(4),
  shift: z.enum(['MATUTINO', 'VESPERTINO', 'NOTURNO', 'INTEGRAL']),
  teacher_id: z.string().uuid().optional().or(z.literal('')),
  active: z.boolean().default(true)
});
