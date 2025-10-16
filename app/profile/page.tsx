'use client';
import { ROUTES } from '@/src/shared/config/routes';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/src/features/auth/lib/useAuth';

export default function ProfileRedirectPage() {
  const router = useRouter();
  const { user, isAuth, isReady } = useAuth();

  useEffect(() => {
    if (!isReady) return;
    if (isAuth && user) {
      router.replace(ROUTES.PROFILE_BY_ID(user.userId));
    } else {
      router.replace(ROUTES.HOME);
    }
  }, [isAuth, isReady, user, router]);

  return null;
}
