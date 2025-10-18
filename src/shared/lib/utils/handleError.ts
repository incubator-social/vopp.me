import { BaseQueryApi, FetchBaseQueryError, FetchBaseQueryMeta, QueryReturnValue } from '@reduxjs/toolkit/query';
import { setAppError } from '@/app/store/appSlice';
import { isErrorWithMessage } from './isErrorWithMessage';
import { ErrorResponse } from '@/src/features/auth/lib/types/api.types';

export const handleError = (
  api: BaseQueryApi,
  result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
) => {
  if (!result.error) return;

  let error = 'Some error occurred';
  const data = result.error?.data as ErrorResponse | undefined;

  switch (result.error.status) {
    case 'PARSING_ERROR':
    case 'CUSTOM_ERROR':
      error = result.error.error;
      break;
    case 'FETCH_ERROR':
      // error = 'Network error. Please check your connection.';
      error = JSON.stringify(result.error);
      break;
    case 429:
      error = 'More than 5 attempts from one IP-address during 10 seconds';
      break;
    case 400:
    case 403:
    case 404:
    case 500:
      if (data?.messages?.length && isErrorWithMessage(data?.messages[0])) {
        error = data.messages[0].message;
      } else {
        error = data?.error || 'Server error occurred';
      }
      break;
    default:
      error = JSON.stringify(result.error);
      break;
  }
  api.dispatch(setAppError({ type: 'error', message: error }));
};
