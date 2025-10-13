'use client';
import { setAppError } from '@/app/appSlice';
import { useAppDispatch } from '@/app/providers/store/hooks';
import { useLogoutMutation } from '@/src/features/auth/api';
import { ROUTES } from '@/src/shared/config/routes';
import { ConfirmModal } from '@/src/shared/ui/ConfirmModal/ConfirmModal';
import Sidebar from '@/src/shared/ui/Sidebar/Sidebar';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/src/features/auth/lib/useAuth';

export const SidebarWrapper = () => {
  const dispatch = useAppDispatch();
  const [active, setActive] = useState('profile');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const router = useRouter();
  const [logout] = useLogoutMutation();

  const { isAuth, isChecking } = useAuth();

  if (isChecking) return null;
  if (!isAuth) return null;

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
      <Sidebar value={active} onValueChange={handleValueChange} />

      <ConfirmModal
        open={confirmOpen}
        title="Log Out"
        message={`Are you really want to log out of your account "???????????"?`} // TODO
        confirmText="Yes"
        cancelText="No"
        onConfirm={handleConfirmLogout}
        onCancel={() => {
          setConfirmOpen(false);
          dispatch(setAppError({ type: 'success', message: 'The user is logged in' })); // нужно доработать Alert, не только на ошибки
        }}
      />
    </>
  );
};
