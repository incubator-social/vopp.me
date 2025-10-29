import { useAppDispatch } from '@/app/providers/store/hooks';
import { setAppError } from '@/app/store/appSlice';
import { ROUTES } from '@/src/shared/config/routes';
import { AUTH_KEYS } from '@/src/shared/config/storage';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const GetTokenGithubOAuth = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('accessToken');

  useEffect(() => {
    if (token && typeof window !== 'undefined') {
      localStorage.setItem(AUTH_KEYS.accessToken, token);
      router.replace(ROUTES.HOME);
    }

    if (!token) {
      dispatch(setAppError({ type: 'error', message: 'Error during authentication via GitHub' }));
      router.replace(ROUTES.AUTH.SIGN_UP);
    }
  }, [searchParams, router, token, dispatch]);

  return null;
};

export default GetTokenGithubOAuth;
