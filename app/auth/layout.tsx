'use client';

import { useAuth } from '@/src/features/auth/lib';
import { AUTH_KEYS } from '@/src/shared/config/storage';
import styles from './layout.module.scss';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace(ROUTES.HOME);
    }
  }, [isAuthenticated, isLoading, router]);

  if (isAuthenticated) return null;

  return <section className={styles.wrapper}>{children}</section>;
}

//нужно допиливать показ компонентов
