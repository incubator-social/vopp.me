import { baseApi } from '@/src/shared/api/baseApi';
import { AUTH_KEYS } from '@/src/shared/config/storage';
import { LoginBody, LoginResponse } from './types';

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginBody>({
      query: (body: LoginBody) => ({
        method: 'post',
        url: 'auth/login',
        body
      }),
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem(AUTH_KEYS.accessToken, data.accessToken);
        } catch (e) {
          console.error(e);
        }
      }
    })
  })
});

export const { useLoginMutation } = authApi;
