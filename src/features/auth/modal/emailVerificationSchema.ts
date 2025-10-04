import { emailField } from '@/src/shared/validation';
import { z } from 'zod';

export const emailVerificationSchema = z.object({
  email: emailField
});

export type FormValuesEmailVerification = z.infer<typeof emailVerificationSchema>;
