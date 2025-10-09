import { ROUTES } from '@/src/shared/config/routes';

export type Status = 'confirmed' | 'invalid';
type Paths = Record<Status, string>;

const paths: Paths = {
  confirmed: ROUTES.AUTH.EMAIL_VERIFICATION_CONFIRMED,
  invalid: ROUTES.AUTH.EMAIL_VERIFICATION_EXPIRED
};

export const getRedirectPath = (status: Status | null) => {
  if (!status) return null;
  return paths[status];
};
