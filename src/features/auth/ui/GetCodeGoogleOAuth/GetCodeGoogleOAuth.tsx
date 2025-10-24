import { useAppDispatch } from '@/app/providers/store/hooks';
import { setAppError } from '@/app/store/appSlice';
import { useGoogleOAuthLoginMutation } from '@/src/features/auth/api';
import { ROUTES } from '@/src/shared/config/routes';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const GetCodeGoogleOAuth = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  const [googleLogin] = useGoogleOAuthLoginMutation();

  useEffect(() => {
    if (!code) {
      dispatch(setAppError({ type: 'error', message: 'Error during authentication via Google' }));
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
  }, [code, googleLogin, router, dispatch]);

  return null;
};

export default GetCodeGoogleOAuth;
