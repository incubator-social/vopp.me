'use client';

import { useEffect, useState } from 'react';
import { getUserFromToken } from '@/src/shared/lib/auth/getUserFromToken';

export function useCurrentUser() {
  const [user, setUser] = useState(() => {
    if (typeof window === 'undefined') return null;
    return getUserFromToken();
  });

  useEffect(() => {
    const handleStorageChange = () => setUser(getUserFromToken());

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return user;
}
