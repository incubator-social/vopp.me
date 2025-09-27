import { ROUTES } from '@/src/shared/config/routes';
import { useState } from 'react';

type Status = 'confirmed' | 'invalid' | 'expired';

export const useConfirmLinkRedirect = ({ status }: Status) => {
  const [path, setStatus] = useState<null | string>(null);

  const paths = {
    confirm: ROUTES.AUTH.EMAIL_VERIFICATION_CONFIRMED,
    invalid: ROUTES.AUTH.SIGN_IN,
    expired: ROUTES.AUTH.EMAIL_VERIFICATION_EXPIRED
  };

  setStatus(paths.hasOwnProperty(status) && paths[status]);

  return [path, setStatus];
};
