import { baseApi } from '@/src/shared/api/baseApi';
import {
  CheckRecoveryCodeRequest,
  CheckRecoveryCodeResponse,
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
      query: ({ email, recaptcha = false, baseUrl = process.env.NEXT_PUBLIC_APP_URL }) => ({
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
    }),
    checkRecoveryCode: builder.mutation<CheckRecoveryCodeResponse, CheckRecoveryCodeRequest>({
      query: ({ recoveryCode }) => ({
        url: '/auth/check-recovery-code',
        method: 'POST',
        body: { recoveryCode }
      })
    })
  })
});

export const { useForgotPasswordMutation, useCreateNewPasswordMutation, useCheckRecoveryCodeMutation } = authApi;
