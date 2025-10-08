'use client';

import { useGetMeQuery } from '@/src/features/auth/api';

export function useAuth() {
  const {
    data: user,
    isLoading,
    isFetching,
    isError
  } = useGetMeQuery(undefined, {
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
