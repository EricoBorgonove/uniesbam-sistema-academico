import { z } from 'zod';

export const enrollmentSchema = z.object({
  student_id: z.string().uuid(),
  class_id: z.string().uuid(),
  status: z.enum(['MATRICULADO', 'APROVADO', 'REPROVADO', 'CANCELADO']).default('MATRICULADO')
});
