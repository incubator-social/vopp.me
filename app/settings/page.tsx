'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/src/shared/config/routes';
import { useAuthGuard } from '@/src/features/auth/lib/useAuthGuard';

export default function SettingsIndexRedirect() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthGuard();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace(`${ROUTES.SETTINGS}?part=info`);
    }
  }, [isAuthenticated, isLoading, router]);

  return <h1>SETTINGS</h1>;
}
