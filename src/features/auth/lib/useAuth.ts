'use client';

import { useGetMeQuery } from '@/src/features/auth/api';
import { AUTH_KEYS } from '@/src/shared/config/storage';

const token = typeof window !== 'undefined' ? localStorage.getItem(AUTH_KEYS.accessToken) : null;

export function useAuth() {
  const {
    data: user,
    isLoading,
    isFetching,
    isError
  } = useGetMeQuery(undefined, {
    skip: !token,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true
  });

  return {
    user,
    isLoading: isLoading || isFetching,
    isError,
    isAuthenticated: Boolean(user && !isError)
  };
}
