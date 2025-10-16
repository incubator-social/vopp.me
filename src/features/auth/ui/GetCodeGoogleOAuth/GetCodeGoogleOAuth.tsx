import { useGoogleOAuthLoginMutation } from '@/src/features/auth/api';
import { ROUTES } from '@/src/shared/config/routes';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const GetCodeGoogleOAuth = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  const [googleLogin] = useGoogleOAuthLoginMutation();

  useEffect(() => {
    if (!code) return;

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
  }, [code, googleLogin, router]);

  return null;
};

export default GetCodeGoogleOAuth;
