'use client';

import { useAppSelector } from '@/app/providers/store/hooks';
import { selectIsAuth } from '@/app/appSlice';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ROUTES } from '@/src/shared/config/routes';

type Options = {
  requireAuth?: boolean;
  redirectTo?: string;
};

/**
 * HOC для защиты страниц и компонентов через Redux-флаг isAuth
 * @example export default withAuth(ProfilePage, { requireAuth: true });
 */
export function withAuth<P extends object>(WrappedComponent: React.ComponentType<P>, options: Options = {}) {
  const { requireAuth = false, redirectTo = ROUTES.AUTH.SIGN_IN } = options;

  return function AuthGuard(props: P) {
    const router = useRouter();
    const isAuth = useAppSelector(selectIsAuth);

    useEffect(() => {
      // для защищённых страниц — редиректим неавторизованных
      if (requireAuth && !isAuth) {
        router.replace(redirectTo);
      }

      // для публичных страниц — редиректим авторизованных на главную
      if (!requireAuth && isAuth) {
        router.replace(ROUTES.HOME);
      }
    }, [isAuth, requireAuth, router, redirectTo]);

    // пока Redux ещё не определил статус (при первой загрузке) — ничего не рендерим
    if (isAuth === null) return null;

    // если неавторизован и страница требует авторизации — скрываем до редиректа
    if (requireAuth && !isAuth) return null;

    // если авторизован, но страница только для гостей — тоже скрываем
    if (!requireAuth && isAuth) return null;

    return <WrappedComponent {...props} />;
  };
}
