import { baseApi } from '@/src/shared/api/baseApi';
import { AUTH_KEYS } from '@/src/shared/config/storage';
import { LoginBody, LoginResponse } from './types';

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    registration: build.mutation({
      query: (userData) => ({
        url: 'auth/registration',
        method: 'POST',
        body: { ...userData, baseUrl: 'http://localhost:3000/auth/confirm-code' }
      }),
      transformResponse: (_result, meta) => {
        return { status: meta?.response?.status ?? 'no status' };
      }
    }),
    confirmRegistration: build.mutation({
      query: (confirmationCode) => ({
        url: 'auth/registration-confirmation',
        method: 'POST',
        body: { confirmationCode }
      }),
      transformResponse: (_result, meta) => {
        return { status: meta?.response?.status ?? 'no status' };
      }
    }),
    emailResending: build.mutation({
      query: (email) => ({
        url: 'auth/registration-email-resending',
        method: 'POST',
        body: { email, baseUrl: 'http://localhost:3000/auth/confirm-code' }
      }),
      transformResponse: (_result, meta) => {
        return { status: meta?.response?.status ?? 'no status' };
      }
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
          localStorage.setItem(AUTH_KEYS.accessToken, data.accessToken);
        } catch (e) {
          console.error(e);
        }
      }
    })
  })
});

export const { useRegistrationMutation, useConfirmRegistrationMutation, useEmailResendingMutation, useLoginMutation } =
  authApi;
