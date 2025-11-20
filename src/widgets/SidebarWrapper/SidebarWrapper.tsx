'use client';

import { useLogoutMutation } from '@/src/features/auth/api';
import { ROUTES } from '@/src/shared/config/routes';
import { ConfirmModal } from '@/src/shared/ui/ConfirmModal/ConfirmModal';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/src/features/auth/lib/useAuth';
import styles from './SidebarWrapper.module.scss';
import { useAlert } from '@/src/shared/hooks/useAlert';
import { Sidebar } from '@/src/shared/ui/Sidebar/Sidebar copy';

export const SidebarWrapper = () => {
  const router = useRouter();
  const pathname = usePathname();
  const alert = useAlert();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [logout] = useLogoutMutation();
  const { user, isAuth, uiReady } = useAuth();

  if (!uiReady) return <div className={styles.skeleton} />;

  const firstSegment = pathname.split('/')[1] || '';
  const activeValue = firstSegment; // пустая строка = ничего не выбрано

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
  console.log('PATH:', pathname);
  return (
    <>
      {isAuth && <Sidebar value={activeValue} onChange={handleChange} disabledValue={null} />}

      <ConfirmModal
        open={confirmOpen}
        title="Log Out"
        message={`Do you really want to log out, ${user?.email}?`}
        confirmText="Yes"
        cancelText="No"
        onConfirm={handleLogout}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
};
