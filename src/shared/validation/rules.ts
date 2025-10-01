import { z } from 'zod';

export const EMAIL_REGEX = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_{|}~])[a-zA-Z\d!"#$%&'()*+,-./:;<=>?@[\]^_{|}~]+$/;
export const USERNAME_REGEX = /^[a-zA-Z0-9_-]+$/;

// готовые поля, которые можно вставлять в схемы
export const emailField = z
  .string()
  .min(1, 'Email is required')
  .regex(EMAIL_REGEX, { message: 'The email must match the format example@example.com' });

export const passwordField = z
  .string()
  .min(1, 'Password is required')
  .min(6, 'Minimum number of characters 6')
  .max(20, 'Maximum number of characters 20')
  .regex(PASSWORD_REGEX, {
    message:
      'Password must be 6–20 characters and include 0-9, a-z, A-Z, and special symbols: !"#$%&\'()*+,-./:;<=>?@[\\]^_{|}~'
  });

export const usernameField = z
  .string()
  .min(1, 'Username is required')
  .min(6, 'Minimum number of characters 6')
  .max(30, 'Maximum number of characters 30')
  .regex(USERNAME_REGEX, 'Username can only contain letters, numbers, underscores and hyphens');
