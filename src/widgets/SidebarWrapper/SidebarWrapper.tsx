'use client';

import { setAppError } from '@/app/appSlice';
import { useAppDispatch, useAppSelector } from '@/app/providers/store/hooks';
import AddPost from '@/src/features/add-post/AddPost';
import { useLogoutMutation } from '@/src/features/auth/api';
import { useAuth } from '@/src/features/auth/lib/useAuth';
import { ROUTES } from '@/src/shared/config/routes';
import { ConfirmModal } from '@/src/shared/ui/ConfirmModal/ConfirmModal';
import { OptionId } from '@/src/shared/ui/Sidebar/data';
import Sidebar from '@/src/shared/ui/Sidebar/Sidebar';
import { setActiveButton } from '@/src/widgets/SidebarWrapper/store';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export const SidebarWrapper = () => {
  const dispatch = useAppDispatch();
  const activeButton = useAppSelector((state) => state.sidebar.activeButton);
  const isOpenAddPost = useAppSelector((state) => state.sidebar.isOpenAddPost);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [logout] = useLogoutMutation();

  const { user, isLoading, isAuthenticated } = useAuth();

  if (pathname.startsWith('/auth')) {
    return null;
  }

  if (isLoading) return null; // нужно сделать скелетон, но это не входит в мою задачу

  if (!isAuthenticated) return null;

  const handleValueChange = (value: OptionId) => {
    if (value === 'logout') {
      setConfirmOpen(true);
      return;
    }
    dispatch(setActiveButton(value));
    // router.push(`/${value}`);
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
      <Sidebar value={activeButton} onValueChange={handleValueChange} />

      {isOpenAddPost && <AddPost />}

      <ConfirmModal
        open={confirmOpen}
        title="Log Out"
        message={`Are you really want to log out of your account "${user?.email}"?`}
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
