import { BaseQueryApi, FetchBaseQueryError, FetchBaseQueryMeta, QueryReturnValue } from '@reduxjs/toolkit/query';
import { setAppError } from '@/app/appSlice';
import { isErrorWithMessage } from './isErrorWithMessage';
import { ResponseErrorType } from '@/src/shared/types/api';

export const handleError = (
  api: BaseQueryApi,
  result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
) => {
  if (!result.error) return;

  let error = 'Some error occurred';
  const data = result.error?.data as ResponseErrorType | undefined;

  switch (result.error.status) {
    case 'PARSING_ERROR':
    case 'CUSTOM_ERROR':
      error = result.error.error;
      break;
    case 'FETCH_ERROR':
      error = 'Network error. Please check your connection.';
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
