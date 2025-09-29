import { z } from 'zod';

export const emailVerificationSchema = z.object({
  email: z.string().email('The email must match the format example@example.com')
});

export type FormValuesEmailVerification = z.infer<typeof emailVerificationSchema>;
