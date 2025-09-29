import { z } from 'zod';

const EMAIL_REGEX = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z!"#$%&'()*+,\-./:;<=>?@[\\\]^_{|}~]{6,20}$/;

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').regex(EMAIL_REGEX, {
    message: 'The email must match the format example@example.com'
  }),

  password: z.string().regex(PASSWORD_REGEX, {
    message:
      'Password must be 6–20 characters and include 0-9, a-z, A-Z. Allowed special symbols: !"#$%&\'()*+,-./:;<=>?@[\\]^_{|}~'
  })
});

export type FormValues = z.infer<typeof loginSchema>;
