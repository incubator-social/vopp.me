'use client';
import { useGetMeQuery } from '@/src/features/auth/api';
import { useToken } from './useToken';
import { useMounted } from '@/src/shared/hooks/useMounted';

export function useAuth() {
  const mounted = useMounted();

  const token = useToken();
  const hasToken = !!token;

  const {
    data: user,
    isUninitialized,
    isLoading,
    isFetching,
    isSuccess,
    isError
  } = useGetMeQuery(undefined, { skip: !hasToken });

  const isChecking = hasToken && (isUninitialized || isLoading || isFetching);
  const isReady = mounted && !isChecking;
  const isAuth = hasToken && !!user && !isError;

  return {
    user: user ?? null,
    hasToken,
    isChecking,
    isAuth,
    isReady,
    isSuccess,
    isError
  };
}
