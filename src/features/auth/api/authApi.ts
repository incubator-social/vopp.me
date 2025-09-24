import { baseApi } from '@/src/shared/api/baseApi';

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
    })
  })
});

export const { useRegistrationMutation, useConfirmRegistrationMutation } = authApi;
