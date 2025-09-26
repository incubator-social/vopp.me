import { baseApi } from '@/src/shared/api/baseApi';

export type ForgotPasswordRequest = {
  email: string;
  recaptcha: boolean;
  baseUrl: string;
};

export type ForgotPasswordResponse = {
  message: string;
};

export type CreateNewPasswordRequest = {
  newPassword: string;
  recoveryCode: string;
};

export type CreateNewPasswordResponse = {
  message: string;
};

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
