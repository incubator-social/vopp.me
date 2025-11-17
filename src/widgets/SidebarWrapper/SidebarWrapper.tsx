'use client';

import { useLogoutMutation } from '@/src/features/auth/api';
import { ROUTES } from '@/src/shared/config/routes';
import { ConfirmModal } from '@/src/shared/ui/ConfirmModal/ConfirmModal';
import Sidebar from '@/src/shared/ui/Sidebar/Sidebar';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/src/features/auth/lib/useAuth';
import styles from './SidebarWrapper.module.scss';
import { useAlert } from '@/src/shared/hooks/useAlert';

export const SidebarWrapper = () => {
  const [active, setActive] = useState('profile');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const router = useRouter();
  const [logout] = useLogoutMutation();
  const { user, isAuth, uiReady } = useAuth();
  const alert = useAlert();

  if (!uiReady) return <div className={styles.skeleton}></div>;

  const handleValueChange = (value: string) => {
    if (value === 'logout') {
      setConfirmOpen(true);
      return;
    }
    setActive(value);
    router.push(`/${value}`);
  };

  const handleConfirmLogout = async () => {
    try {
      await logout().unwrap();
    } catch {
    } finally {
      setConfirmOpen(false);
      router.replace(ROUTES.AUTH.SIGN_IN);
    }
  };

  return (
    <>
      {uiReady && isAuth && <Sidebar value={active} onValueChange={handleValueChange} />}

      <ConfirmModal
        open={confirmOpen}
        title="Log Out"
        message={`Are you really want to log out of your account ${user?.email}?`}
        confirmText="Yes"
        cancelText="No"
        onConfirm={handleConfirmLogout}
        onCancel={() => {
          setConfirmOpen(false);
          alert.info('The user is logged out');
        }}
      />
    </>
  );
};
