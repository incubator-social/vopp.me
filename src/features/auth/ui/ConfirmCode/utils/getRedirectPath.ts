import { ROUTES } from '@/src/shared/config/routes';

export type Status = 'confirmed' | 'invalid' | 'expired';
type Paths = Record<Status, string>;

const paths: Paths = {
  confirmed: ROUTES.AUTH.EMAIL_VERIFICATION_CONFIRMED,
  invalid: ROUTES.AUTH.SIGN_IN,
  expired: ROUTES.AUTH.EMAIL_VERIFICATION_EXPIRED
};

export const getRedirectPath = (status: Status | null) => {
  if (!status) return null;
  return paths[status];
};
