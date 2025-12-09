'use client';

import { useLogoutMutation } from '@/src/features/auth/api';
import { ROUTES } from '@/src/shared/config/routes';
import { ConfirmModal } from '@/src/shared/ui/ConfirmModal/ConfirmModal';
import { useRouter, usePathname } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';
import { useAuth } from '@/src/features/auth/lib/useAuth';
import { useAlert } from '@/src/shared/hooks/useAlert';
import { SidebarSkeleton } from '@/src/shared/ui/Sidebar/SidebarSkeleton/SidebarSkeleton';
import { Sidebar } from '@/src/shared/ui/Sidebar/Sidebar';

export const SidebarWrapper = () => {
  const router = useRouter();
  const pathname = usePathname();
  const alert = useAlert();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [logout] = useLogoutMutation();
  const { user, isAuth, uiReady } = useAuth();

  useLayoutEffect(() => {
    const html = document.documentElement;
    html.classList.toggle('sidebar-visible', isAuth);
  }, [isAuth]);

  if (!uiReady) {
    return <SidebarSkeleton />;
  }

  const firstSegment = pathname.split('/')[1] || '';
  const activeValue = firstSegment;

  const handleChange = (value: string) => {
    if (value === 'logout') {
      setConfirmOpen(true);
      return;
    }
    router.push(`/${value}`);
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } finally {
      router.replace(ROUTES.AUTH.SIGN_IN);
      setConfirmOpen(false);
    }
  };

  return (
    <>
      {isAuth && <Sidebar value={activeValue} onChange={handleChange} disabledValue={null} />}

      <ConfirmModal
        open={confirmOpen}
        title="Log Out"
        message={`Are you really want to log out of your account ${user?.email}?`}
        confirmText="Yes"
        cancelText="No"
        onConfirm={handleLogout}
        onCancel={() => {
          setConfirmOpen(false);
          alert.info('The user is not logged out');
        }}
      />
    </>
  );
};
