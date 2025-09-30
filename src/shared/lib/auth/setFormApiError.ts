import { FieldValues, Path, UseFormSetError } from 'react-hook-form';
import { z } from 'zod';

const ApiErrorSchema = z.object({
  statusCode: z.number(),
  messages: z.string(),
  error: z.string()
});

type ApiErrorResponse = z.infer<typeof ApiErrorSchema>;

type ApiErrorWrapper = {
  data?: unknown;
  status?: number;
};

export function setFormApiError<T extends FieldValues>(error: unknown, setError: UseFormSetError<T>, field: Path<T>) {
  const parsed = ApiErrorSchema.safeParse((error as ApiErrorWrapper)?.data);
  if (!parsed.success) return;

  const err: ApiErrorResponse = parsed.data;
  if (err.statusCode === 400) {
    // это для перезаписи ошибки у поля
    setError(
      field,
      {
        type: 'server',
        message: err.messages
      },
      { shouldFocus: true }
    );
  }
}
