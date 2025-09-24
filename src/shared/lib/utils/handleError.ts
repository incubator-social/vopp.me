import { BaseQueryApi, FetchBaseQueryError, FetchBaseQueryMeta, QueryReturnValue } from '@reduxjs/toolkit/query';
import { setAppError } from '@/app/appSlice';
import { isErrorWithMessage } from './isErrorWithMessage';

export const handleError = (
  api: BaseQueryApi,
  result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
) => {
  let error = 'Some error occurred';

  if (result.error) {
    switch (result.error.status) {
      case 'FETCH_ERROR':
        error = 'Network error. Please check your connection.';
        break;
      case 400:
      case 500:
        if (isErrorWithMessage(result.error.data)) {
          error = result.error.data.message;
        } else {
          error = JSON.stringify(result.error.data);
        }
        break;
      default:
        error = JSON.stringify(result.error);
        break;
    }
    api.dispatch(setAppError({ error }));
  }
};
