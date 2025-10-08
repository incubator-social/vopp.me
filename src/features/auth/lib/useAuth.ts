'use client';

import { useEffect, useState } from 'react';
import { useGetMeQuery } from '@/src/features/auth/api';
import { AUTH_CHANGE_EVENT, getAccessToken } from '@/src/shared/lib/auth/token';

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const sync = () => setToken(getAccessToken());

    sync();
    window.addEventListener('storage', sync);
    window.addEventListener(AUTH_CHANGE_EVENT, sync);
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener(AUTH_CHANGE_EVENT, sync);
    };
  }, []);

  const {
    data: user,
    isLoading,
    isFetching,
    isError,
    refetch
  } = useGetMeQuery(undefined, {
    skip: !token,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true
  });

  const [localUser, setLocalUser] = useState<typeof user | null>(null);

  useEffect(() => {
    if (!token) {
      setLocalUser(null);
      return;
    }
    refetch().then((r) => {
      if (r.data) setLocalUser(r.data);
    });
  }, [token, refetch]);

  return {
    user: token ? localUser : null,
    isLoading: isLoading || isFetching,
    isError,
    isAuthenticated: Boolean(token && localUser && !isError)
  };
}
