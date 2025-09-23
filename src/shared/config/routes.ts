export const ROUTES = {
  HOME: '/',
  AUTH: {
    SIGN_IN: '/auth/sign-in',
    SIGN_UP: '/auth/sign-up',
    FORGOT_PASSWORD: '/auth/forgot-password',
    CREATE_NEW_PASSWORD: '/auth/create-new-password',
    EMAIL_VERIFICATION: '/auth/email-verification'
  },
  PROFILE: '/profile'
} as const;
