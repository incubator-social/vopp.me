import { z } from 'zod';
import { emailField, passwordField, usernameField } from '@/src/shared/validation/rules';

export const signUpSchema = z
  .object({
    username: usernameField,
    email: emailField,
    password: passwordField,
    passwordConfirmation: z.string().min(1, 'Password confirmation is required'),
    agree: z.boolean().refine((val) => val === true, 'You must agree to the terms and conditions')
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords must match',
    path: ['passwordConfirmation']
  });

export type FormValues = z.infer<typeof signUpSchema>;
