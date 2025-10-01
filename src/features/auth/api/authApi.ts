import { handleResponse } from '@/src/features/auth/api/utils';
import { baseApi } from '@/src/shared/api/baseApi';
import { ROUTES } from '@/src/shared/config/routes';
import { AUTH_KEYS } from '@/src/shared/config/storage';
import { LoginBody, LoginResponse, SignUpRequest, SignUpResponse } from './types';

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    registration: build.mutation<SignUpResponse, SignUpRequest>({
      query: (userData) => ({
        url: 'auth/registration',
        method: 'POST',
        body: { ...userData, baseUrl: ROUTES.AUTH.CONFIRM_CODE }
      }),
      transformResponse: handleResponse
    }),
    confirmRegistration: build.mutation({
      query: (confirmationCode: string) => ({
        url: 'auth/registration-confirmation',
        method: 'POST',
        body: { confirmationCode }
      }),
      transformResponse: handleResponse
    }),
    emailResending: build.mutation({
      query: (email: string) => ({
        url: 'auth/registration-email-resending',
        method: 'POST',
        body: { email, baseUrl: ROUTES.AUTH.CONFIRM_CODE }
      }),
      transformResponse: handleResponse
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
