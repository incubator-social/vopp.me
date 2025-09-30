import { baseApi } from '@/src/shared/api/baseApi';
import {
  CreateNewPasswordRequest,
  CreateNewPasswordResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse
} from '@/src/features/auth/lib/types/api.types';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    isAuth: builder.query({
      query: () => ''
    }),
    forgotPassword: builder.mutation<ForgotPasswordResponse, ForgotPasswordRequest>({
      query: ({ email, recaptcha = false, baseUrl = 'http://localhost:3000' }) => ({
        url: '/auth/password-recovery',
        method: 'POST',
        body: { email, recaptcha, baseUrl }
      })
    }),
    createNewPassword: builder.mutation<CreateNewPasswordResponse, CreateNewPasswordRequest>({
      query: ({ newPassword, recoveryCode }) => ({
        url: '/auth/new-password',
        method: 'POST',
        body: { newPassword, recoveryCode }
      })
    })
  })
});

export const { useForgotPasswordMutation, useCreateNewPasswordMutation } = authApi;
