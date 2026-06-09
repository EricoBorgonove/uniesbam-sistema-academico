import { z } from 'zod';

export const studentSchema = z.object({
  registration: z.string().min(2),
  name: z.string().min(3),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
  birth_date: z.string().optional().or(z.literal('')),
  status: z.enum(['ATIVO', 'INATIVO', 'FORMADO', 'TRANCADO']).default('ATIVO')
});
