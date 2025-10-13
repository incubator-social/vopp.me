'use client';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ROUTES } from '@/src/shared/config/routes';
import { useAuth } from '@/src/features/auth/lib/useAuth';

type Options = { requireAuth?: boolean; redirectTo?: string };

export function withAuth<P extends object>(Wrapped: React.ComponentType<P>, opts: Options = {}) {
  const { requireAuth = false, redirectTo = ROUTES.AUTH.SIGN_IN } = opts;

  return function Guard(props: P) {
    const { isAuth, isChecking } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const onAuthSection = pathname.startsWith('/auth');

    useEffect(() => {
      if (isChecking) return;

      if (requireAuth && !isAuth) {
        router.replace(redirectTo);
      }

      if (!requireAuth && isAuth && onAuthSection) {
        const id = setTimeout(() => {
          if (window.location.pathname.startsWith('/auth')) {
            router.replace(ROUTES.HOME);
          }
        }, 0);
        return () => clearTimeout(id);
      }
    }, [isAuth, isChecking, pathname, router, onAuthSection]);

    if (isChecking) return null;
    if (requireAuth && !isAuth) return null;
    if (!requireAuth && isAuth && pathname.startsWith('/auth')) return null;

    return <Wrapped {...(props as P)} />;
  };
}
