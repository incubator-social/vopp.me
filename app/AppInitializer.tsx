'use client';

import { useEffect, useState } from 'react';
import { useGetMeQuery } from '@/src/features/auth/api';
import { AUTH_KEYS } from '@/src/shared/config/storage';
import { useAppDispatch } from '@/app/providers/store/hooks';
import { setIsAuth } from '@/app/appSlice';

/**
 * Инициализация авторизации:
 * - проверяет наличие токена в localStorage
 * - если токен есть → делает запрос /me
 * - если токена нет → сразу устанавливает isAuth = false (без запроса)
 */
export const AppInitializer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const [checkedToken, setCheckedToken] = useState(false);

  const token = typeof window !== 'undefined' ? localStorage.getItem(AUTH_KEYS.accessToken) : null;

  const {
    data: user,
    isLoading,
    isError
  } = useGetMeQuery(undefined, {
    skip: !token
  });

  useEffect(() => {
    if (!token) {
      dispatch(setIsAuth({ isAuth: false }));
      setCheckedToken(true);
      return;
    }
    if (!isLoading) {
      if (user && !isError) {
        dispatch(setIsAuth({ isAuth: true }));
      } else {
        dispatch(setIsAuth({ isAuth: false }));
      }
      setCheckedToken(true);
    }
  }, [token, user, isError, isLoading, dispatch]);

  if (!checkedToken) return null;

  return <>{children}</>;
};
