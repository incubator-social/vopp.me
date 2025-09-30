import { z } from 'zod';
import { emailField } from '@/src/shared/validation/rules';

export const forgotPasswordFormSchema = z.object({
  email: emailField
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordFormSchema>;
