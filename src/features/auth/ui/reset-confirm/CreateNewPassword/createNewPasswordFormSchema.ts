import { z } from 'zod';
import { passwordField } from '@/src/shared/validation/rules';

export const createNewPasswordSchema = z
  .object({
    newPassword: passwordField.trim(),
    confirmPassword: z.string().trim().min(1, 'Password confirmation is required')
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword']
  });

export type CreateNewPasswordFormValues = z.infer<typeof createNewPasswordSchema>;
