'use client';

import { useGoogleOAuthLoginMutation } from '@/src/features/auth/api';
import { ROUTES } from '@/src/shared/config/routes';
import { useAlert } from '@/src/shared/hooks/useAlert';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

const GetCodeGoogleOAuth = () => {
  const alert = useAlert();
  const router = useRouter();
  const searchParams = useSearchParams();

  const code = searchParams.get('code');
  const [googleLogin] = useGoogleOAuthLoginMutation();

  // --- стабилизация зависимостей ---
  const alertRef = useRef(alert);
  const routerRef = useRef(router);
  const loginRef = useRef(googleLogin);

  useEffect(() => {
    alertRef.current = alert;
    routerRef.current = router;
    loginRef.current = googleLogin;
  }, [alert, router, googleLogin]);

  useEffect(() => {
    if (!code) {
      alertRef.current.error('Error during authentication via Google');
      routerRef.current.replace(ROUTES.AUTH.SIGN_UP);
      return;
    }

    const run = async (confirmedCode: string) => {
      try {
        const { data } = await loginRef.current({ code: confirmedCode });
        if (data?.status === 201) {
          routerRef.current.replace(ROUTES.HOME);
        }
      } catch {
        alertRef.current.error('Google login failed');
        routerRef.current.replace(ROUTES.AUTH.SIGN_UP);
      }
    };

    run(code);
  }, [code]);

  return null;
};

export default GetCodeGoogleOAuth;
