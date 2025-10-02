import { baseApi } from '@/src/shared/api/baseApi';
import { AUTH_KEYS } from '@/src/shared/config/storage';
import { LoginBody, LoginResponse, MeResponse } from './types';

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<MeResponse, void>({
      query: () => ({ url: 'auth/me', method: 'GET' }),
      providesTags: ['Auth']
    }),
    login: build.mutation<LoginResponse, LoginBody>({
      query: (body: LoginBody) => ({
        method: 'post',
        url: 'auth/login',
        body
      }),
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (typeof window !== 'undefined') {
            localStorage.setItem(AUTH_KEYS.accessToken, data.accessToken);
          }
        } catch {}
      },
      invalidatesTags: ['Auth']
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        method: 'post',
        url: 'auth/logout',
        body: {},
        responseHandler: (response) => response.text()
      }),
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch {
        } finally {
          if (typeof window !== 'undefined') {
            localStorage.removeItem(AUTH_KEYS.accessToken);
          }
          // сбрасываем данные из стора, пока у нас их нет, но в будущем будет, затрем все постепенно
        }
      },
      invalidatesTags: ['Auth']
    })
  })
});

export const { useLoginMutation, useLogoutMutation, useGetMeQuery } = authApi;
