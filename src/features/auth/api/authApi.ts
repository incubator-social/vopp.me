import { handleResponse } from '@/src/features/auth/api/utils';
import { baseApi } from '@/src/shared/api/baseApi';
import { ROUTES } from '@/src/shared/config/routes';
import { AUTH_KEYS } from '@/src/shared/config/storage';
import { LoginBody, LoginResponse, SignUpRequest, SignUpResponse, MeResponse } from './types';

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<MeResponse, void>({
      query: () => ({ url: 'auth/me', method: 'GET' }),
      providesTags: ['Auth']
    }),
    registerUser: build.mutation<SignUpResponse, SignUpRequest>({
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
    resendVerificationEmail: build.mutation({
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

export const {
  useRegisterUserMutation,
  useConfirmRegistrationMutation,
  useResendVerificationEmailMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetMeQuery
} = authApi;
