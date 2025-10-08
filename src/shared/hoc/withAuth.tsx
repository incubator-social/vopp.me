'use client';

import { useAuth } from '@/src/features/auth/lib';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ROUTES } from '@/src/shared/config/routes';

type Options = {
  requireAuth?: boolean;
  redirectTo?: string;
};

/**
 * HOC для защиты страниц и компонентов
 * @example export default withAuth(ProfilePage, { requireAuth: true });
 */
export function withAuth<P extends object>(WrappedComponent: React.ComponentType<P>, options: Options = {}) {
  const { requireAuth = false, redirectTo = ROUTES.HOME } = options;

  return function AuthGuard(props: P) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (isLoading) return;

      // если страница только для авторизованных
      if (requireAuth && !isAuthenticated) {
        router.replace(redirectTo);
      }

      // если страница только для неавторизованных
      if (!requireAuth && isAuthenticated) {
        router.replace(ROUTES.HOME);
      }
    }, [isAuthenticated, isLoading, router]);

    // пока грузим или редиректим — ничего не показываем
    if (isLoading || (requireAuth && !isAuthenticated)) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
