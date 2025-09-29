import { FieldValues, UseFormSetError, Path } from 'react-hook-form';
import { z } from 'zod';

export const SignUpServerErrorSchema = z.object({
  statusCode: z.number(),
  messages: z.array(
    z.object({
      message: z.string(),
      field: z.string()
    })
  ),
  error: z.string()
});

type SignUpErrorResponse = z.infer<typeof SignUpServerErrorSchema>;
type SignUpServerErrorWrapper = {
  data?: unknown;
  status?: number;
};

const fieldMapping: Record<string, string> = {
  userName: 'username',
  email: 'email',
  password: 'password',
  passwordConfirmation: 'passwordConfirmation',
  agree: 'agree'
};

export const setSignUpServerError = <T extends FieldValues>(error: unknown, setError: UseFormSetError<T>) => {
  const parsed = SignUpServerErrorSchema.safeParse((error as SignUpServerErrorWrapper)?.data);

  if (!parsed.success) return;

  const err: SignUpErrorResponse = parsed.data;

  if (err.statusCode === 400) {
    err.messages.forEach((error) => {
      const field = fieldMapping[error.field];
      if (field) {
        setError(field as Path<T>, { type: 'server', message: error.message }, { shouldFocus: true });
      }
    });
  }
};
