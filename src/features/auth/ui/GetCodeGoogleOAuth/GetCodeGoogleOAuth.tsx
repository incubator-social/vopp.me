import { useGoogleOAuthLoginMutation } from '@/src/features/auth/api';
import { ROUTES } from '@/src/shared/config/routes';
import { useAlert } from '@/src/shared/hooks/useAlert';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const GetCodeGoogleOAuth = () => {
  const alert = useAlert();
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  const [googleLogin, { isSuccess, isError, data }] = useGoogleOAuthLoginMutation();

  // запускаем запрос ОДИН раз
  useEffect(() => {
    if (!code) {
      alert.error('Error during authentication via Google');
      router.replace(ROUTES.AUTH.SIGN_UP);
      return;
    }

    googleLogin({ code });
  }, [code, alert, googleLogin, router]);

  // 2успешный login
  useEffect(() => {
    if (isSuccess && data?.status === 201) {
      router.replace(ROUTES.HOME);
    }
  }, [isSuccess, data, router]);

  // 3ошибка login
  useEffect(() => {
    if (isError) {
      alert.error('Google login failed');
      router.replace(ROUTES.AUTH.SIGN_UP);
    }
  }, [isError, router, alert]);

  return null;
};

export default GetCodeGoogleOAuth;
