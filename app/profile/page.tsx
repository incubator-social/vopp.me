'use client';
import { ROUTES } from '@/src/shared/config/routes';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/src/features/auth/lib/useAuth';
import { useMounted } from '@/src/shared/hooks/useMounted';

export default function ProfileRedirectPage() {
  const router = useRouter();
  const mounted = useMounted();
  const { user, isAuth, isFetching } = useAuth();

  useEffect(() => {
    if (isFetching || !mounted) return;

    if (isAuth && user) {
      router.replace(ROUTES.PROFILE_BY_ID(user.userId));
    } else {
      router.replace(ROUTES.HOME);
    }
  }, [isAuth, user, isFetching, router]);

  return null;
}
