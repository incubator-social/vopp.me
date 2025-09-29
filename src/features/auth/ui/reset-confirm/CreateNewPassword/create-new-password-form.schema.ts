import { z } from 'zod';
import { passwordSchema } from '@/src/shared/schemas/form.shema';

export const createNewPasswordSchema = z
  .object({
    newPassword: passwordSchema.trim(),
    confirmPassword: z.string().trim().min(1, 'Password confirmation is required')
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword']
  });

export type CreateNewPasswordFormValues = z.infer<typeof createNewPasswordSchema>;
