import { z } from 'zod';

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[!-~]+$/;

export const emailSchema = z.email('Please enter a valid email');
export const passwordSchema = z
  .string()
  .min(1, 'Password is required')
  .min(6, 'Minimum number of characters 6')
  .max(20, 'Maximum number of characters 20')
  .regex(
    PASSWORD_REGEX,
    'Password must contain 0-9, a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _ { | } ~'
  );

export type PasswordValue = z.infer<typeof passwordSchema>;
