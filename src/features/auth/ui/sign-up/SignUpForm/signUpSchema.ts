import { z } from 'zod';

const USERNAME_REGEX = /^[a-zA-Z0-9_-]+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[!-~]+$/;
const EMAIL_REGEX = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;

export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(1, 'Username is required')
      .min(6, 'Minimum number of characters 6')
      .max(30, 'Maximum number of characters 30')
      .regex(USERNAME_REGEX, 'Username can only contain letters, numbers, underscores and hyphens'),

    email: z.string().min(1, 'Email is required').regex(EMAIL_REGEX, {
      message: 'The email must match the format example@example.com'
    }),

    password: z
      .string()
      .min(1, 'Password is required')
      .min(6, 'Minimum number of characters 6')
      .max(20, 'Maximum number of characters 20')
      .regex(
        PASSWORD_REGEX,
        'Password must contain 0-9, a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _ { | } ~'
      ),

    passwordConfirmation: z.string().min(1, 'Password confirmation is required'),

    agree: z.boolean().refine((val) => val === true, 'You must agree to the terms and conditions')
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords must match',
    path: ['passwordConfirmation']
  });

export type FormValues = z.infer<typeof signUpSchema>;
