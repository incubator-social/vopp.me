export const ROUTES = {
  HOME: '/',
  AUTH: {
    SIGN_IN: '/auth/sign-in',
    SIGN_UP: '/auth/sign-up',
    CONFIRM_CODE: `${process.env.NEXT_PUBLIC_APP_URL}/auth/confirm-code`,
    FORGOT_PASSWORD: '/auth/forgot-password',
    CREATE_NEW_PASSWORD: '/auth/create-new-password',
    EMAIL_VERIFICATION_CONFIRMED: '/auth/email-confirmed',
    EMAIL_VERIFICATION_EXPIRED: '/auth/email-expired',
    RECOVERY_LINK_EXPIRED: '/auth/recovery-link-expired'
  },
  LEGAL: {
    PRIVACY: '/legal/privacy',
    TERMS_OF_SERVICE: '/legal/terms'
  },
  PROFILE: '/profile',
  PROFILE_BY_ID: (id: number | string) => `/profile/${id}`
} as const;
