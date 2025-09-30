import { z } from 'zod';
import { emailField, passwordField } from '@/src/shared/validation/rules';

export const signInSchema = z.object({
  email: emailField,
  password: passwordField
});

export type FormValues = z.infer<typeof signInSchema>;
