'use client';
import { useGetMeQuery } from '@/src/features/auth/api';
import { useToken } from './useToken';

export function useAuth() {
  const token = useToken();

  const { data: user, isLoading, isFetching, isSuccess } = useGetMeQuery(undefined, { skip: !token });

  const isChecking = !!token && (isLoading || isFetching);
  const isAuth = Boolean(token && isSuccess && user);

  return { user: user ?? null, isAuth, isChecking, isFetching };
}
