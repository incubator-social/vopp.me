export const ROUTES = {
  HOME: '/',
  AUTH: {
    SIGN_IN: '/auth/sign-in',
    SIGN_UP: '/auth/sign-up',
    FORGOT_PASSWORD: '/auth/forgot-password',
    CREATE_NEW_PASSWORD: '/auth/create-new-password'
  },
  PROFILE: '/profile',
  LEGAL: {
    PRIVACY: '/legal/privacy',
    TERMS_OF_SERVICE: '/legal/terms'
  }
} as const;
