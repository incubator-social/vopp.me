import { z } from 'zod';

const EMAIL_REGEX = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').regex(EMAIL_REGEX, {
    message: 'The email must match the format example@example.com'
  }),

  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Minimum number of characters 6')
    .max(20, 'Maximum number of characters 20')
});

export type FormValues = z.infer<typeof loginSchema>;
