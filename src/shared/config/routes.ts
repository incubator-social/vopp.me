export const ROUTES = {
  HOME: '/',
  AUTH: {
    SIGN_IN: '/auth/SignIn',
    SIGN_UP: '/auth/SignUp',
    CONFIRM_CODE: 'http://localhost:3000/auth/confirm-code',
    FORGOT_PASSWORD: '/auth/forgot-password',
    CREATE_NEW_PASSWORD: '/auth/create-new-password',
    EMAIL_VERIFICATION_CONFIRMED: '/auth/email-confirmed',
    EMAIL_VERIFICATION_EXPIRED: '/auth/email-expired'
  },
  LEGAL: {
    PRIVACY: '/legal/privacy',
    TERMS_OF_SERVICE: '/legal/terms'
  },
  PROFILE: '/profile',
  PROFILE_BY_ID: (id: number | string) => `/profile/${id}`
} as const;
