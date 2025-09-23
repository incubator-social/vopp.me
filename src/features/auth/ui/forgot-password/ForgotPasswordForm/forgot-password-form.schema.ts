import { z } from 'zod';
import { emailSchema } from '@/src/shared/schemas/form.shema';

export const forgotPasswordSchema = z.object({
  email: emailSchema
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
