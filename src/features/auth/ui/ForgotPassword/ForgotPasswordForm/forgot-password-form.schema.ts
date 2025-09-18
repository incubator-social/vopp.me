import { z } from 'zod';
import { emailSchema } from '@/src/shared/schemas/form.shema';

export type ForgotPasswordFormValues = {
  email: string;
};

export const forgotPasswordSchema = z.object({
  email: emailSchema
});
