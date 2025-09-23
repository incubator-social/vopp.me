import { ResponseErrorType } from '@/src/shared/types/api';

export type ApiErrorResult = {
  fieldErrors?: Record<string, string>;
  message?: string;
};

/**
 * Универсальная функция обработки ошибок API.
 * @param err - ошибка, полученная из RTK Query или axios/fetch
 */
export const handleApiError = (err: unknown): ApiErrorResult => {
  const result: ApiErrorResult = {};

  const error = err as { status?: number; data?: ResponseErrorType };

  if (error?.data?.messages?.length) {
    error.data.messages.forEach((msg) => {
      if (msg.field) {
        result.fieldErrors = { ...(result.fieldErrors || {}), [msg.field]: msg.message };
      } else {
        result.message = msg.message;
      }
    });
  } else if (!navigator.onLine) {
    result.message = 'Network error. Please check your connection.';
  } else if (error?.status) {
    result.message = 'Something went wrong. Please try again later.';
  } else {
    result.message = 'Something went wrong. Please try again later.';
  }

  return result;
};
