'use client';
import { useGetMeQuery } from '@/src/features/auth/api';
import { useToken } from './useToken';

export function useAuth() {
  const token = useToken();

  const { data: user, isFetching, isSuccess } = useGetMeQuery(undefined, { skip: !token });

  const isAuth = Boolean(token && isSuccess && user);

  return { user: user ?? null, isAuth, isFetching };
}
