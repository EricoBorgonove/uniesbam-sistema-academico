import { z } from 'zod';

export const gradeSchema = z.object({
  enrollment_id: z.string().uuid(),
  label: z.string().min(2),
  value: z.coerce.number().min(0).max(10),
  weight: z.coerce.number().positive().default(1)
});
