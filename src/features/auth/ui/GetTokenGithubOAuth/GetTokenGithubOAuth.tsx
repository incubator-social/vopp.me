import { ROUTES } from '@/src/shared/config/routes';
import { AUTH_KEYS } from '@/src/shared/config/storage';
import { useAlert } from '@/src/shared/hooks/useAlert';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const GetTokenGithubOAuth = () => {
  const alert = useAlert();

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('accessToken');

  useEffect(() => {
    if (token && typeof window !== 'undefined') {
      localStorage.setItem(AUTH_KEYS.accessToken, token);
      router.replace(ROUTES.HOME);
    }

    if (!token) {
      alert.error('Error during authentication via GitHub');
      router.replace(ROUTES.AUTH.SIGN_UP);
    }
  }, [searchParams, router, token, alert]);

  return null;
};

export default GetTokenGithubOAuth;
