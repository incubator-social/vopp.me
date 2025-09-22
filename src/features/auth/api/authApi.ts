import { baseApi } from '../../../shared/api/baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    registration: build.mutation({
      query: (userData) => ({
        url: 'auth/registration',
        method: 'POST',
        body: userData
      }),
      transformResponse: (_result, meta) => {
        return { status: meta?.response?.status ?? 0 };
      }
    }),
    confirmRegistration: build.mutation({
      query: (confirmationCode) => ({
        url: 'auth/registration-confirmation',
        method: 'POST',
        body: { confirmationCode }
      })
    })
  })
});

export const { useRegistrationMutation, useConfirmRegistrationMutation } = authApi;
