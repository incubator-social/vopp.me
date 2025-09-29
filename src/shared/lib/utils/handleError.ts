import { BaseQueryApi, FetchBaseQueryError, FetchBaseQueryMeta, QueryReturnValue } from '@reduxjs/toolkit/query';
import { setAppError } from '@/app/appSlice';
import { isErrorWithMessage } from './isErrorWithMessage';
import { ResponseErrorType } from '@/src/shared/types/api';

export const handleError = (
  api: BaseQueryApi,
  result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
) => {
  let error = 'Some error occurred';
  const data = result.error?.data as ResponseErrorType | undefined;

  if (result.error) {
    switch (result.error.status) {
      case 'PARSING_ERROR':
      case 'CUSTOM_ERROR':
        error = result.error.error;
        break;
      case 'FETCH_ERROR':
        error = 'Network error. Please check your connection.';
        break;
      case 429:
        error = 'More than 5 attempts from one IP-address during 10 seconds';
        break;
      case 400:
      case 500:
        if (isErrorWithMessage(data?.messages[0])) {
          error = data.messages[0].message;
        } else {
          error = JSON.stringify(data);
        }
        break;
      default:
        error = JSON.stringify(result.error);
        break;
    }
    api.dispatch(setAppError({ error }));
  }
};
