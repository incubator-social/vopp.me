import { z } from 'zod';
import { emailField } from '@/src/shared/validation/rules';

export const forgotPasswordSchema = z.object({
  email: emailField
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
