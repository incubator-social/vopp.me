'use client';

import styles from './layout.module.scss';
import { useGuestGuard } from '@/src/features/auth/lib/useGuestGuard';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated } = useGuestGuard();
  if (isAuthenticated || isLoading) return null;
  return <section className={styles.wrapper}>{children}</section>;
}
