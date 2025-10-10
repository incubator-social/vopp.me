'use client';

import { useEffect, useState } from 'react';
import { useGetMeQuery } from '@/src/features/auth/api';
import { AUTH_KEYS } from '@/src/shared/config/storage';

export function useAuth() {
  const [initialized, setInitialized] = useState(false);
  const [token, setToken] = useState<string | null>(
    typeof window !== 'undefined' ? localStorage.getItem(AUTH_KEYS.accessToken) : null
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const sync = () => {
      setToken(localStorage.getItem(AUTH_KEYS.accessToken));
      setInitialized(true);
    };

    sync();
    window.addEventListener('auth-changed', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('auth-changed', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const { data: user, isLoading, isError } = useGetMeQuery(undefined, { skip: !token });

  const isAuthenticated = Boolean(token && user && !isError);

  return {
    user,
    isLoading: isLoading || !initialized,
    isError,
    isAuthenticated
  };
}
