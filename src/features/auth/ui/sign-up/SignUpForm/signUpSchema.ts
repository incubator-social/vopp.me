import { z } from 'zod';

const USERNAME_REGEX = /^[a-zA-Z0-9_-]+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[!-~]+$/;

export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(1, 'Username is required')
      .min(6, 'Username must be at least 6 characters')
      .max(30, 'Username must be at most 30 characters')
      .regex(USERNAME_REGEX, 'Username can only contain letters, numbers, underscores and hyphens'),

    email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),

    password: z
      .string()
      .min(1, 'Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password must be at most 20 characters')
      .regex(PASSWORD_REGEX, 'Password contains invalid characters'),

    passwordConfirmation: z.string().min(1, 'Password confirmation is required'),

    agree: z.boolean().refine((val) => val === true, 'You must agree to the terms and conditions')
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ['passwordConfirmation']
  });

export type FormValues = z.infer<typeof signUpSchema>;
