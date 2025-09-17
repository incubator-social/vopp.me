import { z } from 'zod';

export type ForgotPasswordFormValues = {
  email: string;
};

export const forgotPasswordSchema = z.object({
  email: z.string().email('Введите корректный email')
});
