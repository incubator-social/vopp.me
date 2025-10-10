'use client';

import { ROUTES } from '@/src/shared/config/routes';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getUserFromToken } from '@/src/shared/lib/auth/getUserFromToken';

export default function ProfileRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const user = getUserFromToken();

    if (user) {
      router.replace(ROUTES.PROFILE_BY_ID(user.userId));
      return;
    } else {
      router.replace(ROUTES.HOME);
      return;
    }
  }, [router]);

  return null;
}
