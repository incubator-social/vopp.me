import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import { AUTH_KEYS } from '../config/storage';
import { UpdateTokensResponse } from '@/src/features/auth/api';
import { baseApi } from './baseApi';
import { baseQuery } from './baseQuery';
import { handleError } from '@/src/shared/lib/utils/handleError';

const mutex = new Mutex();

export const baseQueryWithRefresh: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const token = typeof window !== 'undefined' ? localStorage.getItem(AUTH_KEYS.accessToken) : null;

    if (!token) {
      return result;
    }
    const isUpdatingTokens =
      typeof args !== 'string' && typeof args?.url === 'string' && args.url.includes('auth/update-tokens');

    if (!isUpdatingTokens) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        try {
          const refreshResult = await baseQuery({ url: 'auth/update-tokens', method: 'POST' }, api, extraOptions);

          if (refreshResult.data) {
            const { accessToken } = refreshResult.data as UpdateTokensResponse;

            if (accessToken) {
              localStorage.setItem(AUTH_KEYS.accessToken, accessToken);
              window.dispatchEvent(new Event('auth-changed'));
            }

            result = await baseQuery(args, api, extraOptions);
          } else {
            localStorage.removeItem(AUTH_KEYS.accessToken);
            api.dispatch(baseApi.util.resetApiState());
            window.dispatchEvent(new Event('auth-changed'));
            return refreshResult;
          }
        } finally {
          release();
        }
      } else {
        await mutex.waitForUnlock();
        result = await baseQuery(args, api, extraOptions);
      }
    }
  }

  // глобальная обработка (кроме 401, он выше)
  if (result.error && result.error.status !== 401) {
    handleError(api, result);
  }

  return result;
};
