'use client';

import { useAuthGuard } from '@/src/features/auth/lib/useAuthGuard';

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthGuard();

  if (isLoading) return null;

  if (!isAuthenticated) return null;

  return <>{children}</>;
}
