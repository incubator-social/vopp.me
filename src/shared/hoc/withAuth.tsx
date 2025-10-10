'use client';

import { useAppSelector } from '@/app/providers/store/hooks';
import { selectIsAuth } from '@/app/appSlice';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { ROUTES } from '@/src/shared/config/routes';

type Options = {
  requireAuth?: boolean;
  redirectTo?: string;
};

export function withAuth<P extends object>(WrappedComponent: React.ComponentType<P>, options: Options = {}) {
  const { requireAuth = false, redirectTo = ROUTES.AUTH.SIGN_IN } = options;

  return function AuthGuard(props: P) {
    const router = useRouter();
    const pathname = usePathname();
    const isAuth = useAppSelector(selectIsAuth);

    useEffect(() => {
      if (isAuth === null) return; // ждём определения статуса

      const onAuthSection = pathname.startsWith('/auth');
      const skip = sessionStorage.getItem('skip-auth-redirect') === '1';

      // защищённые страницы: если не авторизован — уводим на логин
      if (requireAuth && !isAuth) {
        router.replace(redirectTo);
        return;
      }

      // публичные auth-страницы: если уже авторизован — уводим на главную,
      if (!requireAuth && isAuth && onAuthSection && !skip) {
        const id = setTimeout(() => {
          if (window.location.pathname.startsWith('/auth')) {
            router.replace(ROUTES.HOME);
          }
        }, 0);
        return () => clearTimeout(id);
      }

      // если флаг стоял, очищаем его (логин успешно инициировал свой redirect)
      if (skip) sessionStorage.removeItem('skip-auth-redirect');
    }, [isAuth, pathname, router]);

    if (isAuth === null) return null;
    if (requireAuth && !isAuth) return null;
    if (!requireAuth && isAuth && pathname.startsWith('/auth')) return null;

    return <WrappedComponent {...(props as P)} />;
  };
}
