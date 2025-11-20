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

  const [googleLogin] = useGoogleOAuthLoginMutation();

  useEffect(() => {
    if (!code) {
      alert.error('Error during authentication via Google');
      router.replace(ROUTES.AUTH.SIGN_UP);
      return;
    }

    async function loginGoogleOAuth() {
      try {
        if (code) {
          const { data } = await googleLogin({ code });
          if (data?.status === 201) {
            router.replace(ROUTES.HOME);
          }
        }
      } catch {}
    }

    loginGoogleOAuth();
  }, [code, googleLogin, router, alert]);

  return null;
};

export default GetCodeGoogleOAuth;
