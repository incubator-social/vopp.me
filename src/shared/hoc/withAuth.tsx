'use client';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ROUTES } from '@/src/shared/config/routes';
import { useAuth } from '@/src/features/auth/lib/useAuth';
import { useMounted } from '@/src/shared/hooks/useMounted';

type Options = { requireAuth?: boolean; redirectTo?: string };

export function withAuth<P extends object>(Wrapped: React.ComponentType<P>, opts: Options = {}) {
  const { requireAuth = false, redirectTo = ROUTES.AUTH.SIGN_IN } = opts;

  return function Guard(props: P) {
    const { isAuth, isChecking } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const onAuthSection = pathname.startsWith('/auth');
    const mounted = useMounted();

    useEffect(() => {
      if (isChecking || !mounted) return;

      if (requireAuth && !isAuth) {
        router.replace(redirectTo);
        return;
      }

      if (!requireAuth && isAuth && onAuthSection) {
        router.replace(ROUTES.HOME);
      }
    }, [isAuth, isChecking, mounted, redirectTo, onAuthSection, router]);

    if (!mounted && onAuthSection) return null;
    if (isChecking) return null;
    if (requireAuth && !isAuth) return null;
    if (!requireAuth && isAuth && onAuthSection) return null;

    return <Wrapped {...(props as P)} />;
  };
}
