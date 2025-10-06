'use client';

import { useGetMeQuery } from '@/src/features/auth/api';
import { AUTH_KEYS } from '@/src/shared/config/storage';

export function useAuth() {
  const token = typeof window !== 'undefined' ? localStorage.getItem(AUTH_KEYS.accessToken) : null;

  const {
    data: user,
    isLoading,
    isError
  } = useGetMeQuery(undefined, {
    skip: !token
  });

  const isAuthenticated = Boolean(user && !isError);

  return {
    user,
    isLoading,
    isError,
    isAuthenticated
  };
}
