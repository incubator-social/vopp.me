'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/src/shared/config/routes';
import { useCurrentUser } from '@/src/features/auth/lib/useCurrentUser';

export default function ProfileRedirectPage() {
  const router = useRouter();
  const user = useCurrentUser();

  useEffect(() => {
    if (user) {
      router.replace(ROUTES.PROFILE_BY_ID(user.userId));
    } else {
      router.replace(ROUTES.HOME);
    }
  }, [user, router]);

  return null;
}
