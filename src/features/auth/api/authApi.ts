import { baseApi } from '@/src/shared/api/baseApi';
import { AUTH_KEYS } from '@/src/shared/config/storage';
import { LoginBody, LoginResponse } from './types';

export type User = {
  userId: number;
  userName: string;
  email: string;
  isBlocked: boolean;
};

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
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        method: 'post',
        url: 'auth/logout'
      }),
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          localStorage.removeItem(AUTH_KEYS.accessToken);
          dispatch(baseApi.util.resetApiState());
        } catch (e) {
          console.error(e);
          localStorage.removeItem(AUTH_KEYS.accessToken);
        }
      }
    }),
    getMe: build.query<User, void>({
      query: () => 'auth/me'
    })
  })
});

export const { useLoginMutation, useLogoutMutation, useGetMeQuery } = authApi;
