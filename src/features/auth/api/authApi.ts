import { handleSignUpResponse } from '@/src/features/auth/api/utils';
import { baseApi } from '@/src/shared/api/baseApi';
import { AUTH_KEYS } from '@/src/shared/config/storage';
import {
  LoginBody,
  LoginResponse,
  SignUpRequest,
  SignUpResponse,
  MeResponse,
  GoogleOAuthResponse,
  GoogleOAuthRequest
} from './types';
import {
  CheckRecoveryCodeRequest,
  CheckRecoveryCodeResponse,
  CreateNewPasswordRequest,
  CreateNewPasswordResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse
} from '@/src/features/auth/lib/types/api.types';
import { ROUTES } from '@/src/shared/config/routes';

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
      transformResponse: handleSignUpResponse
    }),
    confirmRegistration: build.mutation({
      query: (confirmationCode: string) => ({
        url: 'auth/registration-confirmation',
        method: 'POST',
        body: { confirmationCode }
      }),
      transformResponse: handleSignUpResponse
    }),
    resendVerificationEmail: build.mutation({
      query: (email: string) => ({
        url: 'auth/registration-email-resending',
        method: 'POST',
        body: { email, baseUrl: ROUTES.AUTH.CONFIRM_CODE }
      }),
      transformResponse: handleSignUpResponse
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
    googleOAuthLogin: build.mutation<GoogleOAuthResponse, GoogleOAuthRequest>({
      query: ({ code }) => ({
        method: 'POST',
        url: 'auth/google/login',
        body: { redirectUrl: `${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL}`, code }
      }),
      transformResponse: (
        response: GoogleOAuthResponse,
        meta: {
          response: { status: number | string | undefined };
        }
      ) => {
        return { accessToken: response?.accessToken, email: response?.email, status: meta?.response.status };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (typeof window !== 'undefined' && data?.accessToken) {
            localStorage.setItem(AUTH_KEYS.accessToken, data?.accessToken);
          }
        } catch {}
      }
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
    }),
    forgotPassword: build.mutation<ForgotPasswordResponse, ForgotPasswordRequest>({
      query: ({ email, recaptcha = null }: ForgotPasswordRequest) => ({
        url: '/auth/password-recovery',
        method: 'POST',
        body: {
          email,
          recaptcha,
          baseUrl: `${process.env.NEXT_PUBLIC_APP_URL}${ROUTES.AUTH.CREATE_NEW_PASSWORD}`
        }
      })
    }),
    createNewPassword: build.mutation<CreateNewPasswordResponse, CreateNewPasswordRequest>({
      query: ({ newPassword, recoveryCode }: CreateNewPasswordRequest) => ({
        url: '/auth/new-password',
        method: 'POST',
        body: { newPassword, recoveryCode }
      })
    }),
    checkRecoveryCode: build.mutation<CheckRecoveryCodeResponse, CheckRecoveryCodeRequest>({
      query: ({ recoveryCode }: CheckRecoveryCodeRequest) => ({
        url: '/auth/check-recovery-code',
        method: 'POST',
        body: { recoveryCode }
      })
    })
  })
});

export const {
  useRegisterUserMutation,
  useConfirmRegistrationMutation,
  useResendVerificationEmailMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetMeQuery,
  useForgotPasswordMutation,
  useCreateNewPasswordMutation,
  useCheckRecoveryCodeMutation,
  useGoogleOAuthLoginMutation
} = authApi;
