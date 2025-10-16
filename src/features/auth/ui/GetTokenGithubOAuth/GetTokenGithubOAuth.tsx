import { ROUTES } from '@/src/shared/config/routes';
import { AUTH_KEYS } from '@/src/shared/config/storage';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const GetTokenGithubOAuth = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('accessToken');

  useEffect(() => {
    if (token && typeof window !== 'undefined') {
      localStorage.setItem(AUTH_KEYS.accessToken, token);
      router.replace(ROUTES.HOME);
    } else {
      router.replace(ROUTES.AUTH.SIGN_IN);
    }
  }, [searchParams, router, token]);

  return null;
};

export default GetTokenGithubOAuth;
