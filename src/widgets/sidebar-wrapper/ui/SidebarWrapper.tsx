'use client';

import { useLogoutMutation } from '@/src/features/auth/api';
import { useRouter } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';

import { useAuth } from '@/src/features/auth/lib/useAuth';
import { AddPost } from '@/src/features/add-post/ui/AddPost';
import { setCurrentStep, Steps } from '@/src/features/add-post';

import { ROUTES } from '@/src/shared/config/routes';
import { useAlert } from '@/src/shared/hooks/useAlert';
import { ConfirmModal } from '@/src/shared/ui/ConfirmModal/ConfirmModal';

import { Sidebar } from '@/src/widgets/sidebar';
import { OptionId } from '@/src/widgets/sidebar/config';

import { SidebarSkeleton } from '../ui/sidebar-skeleton';
import { openAddPost, setActiveButton, setPreviousActiveButton } from '../model';

export const SidebarWrapper = () => {
  const router = useRouter();
  const alert = useAlert();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [logout] = useLogoutMutation();
  const { user, isAuth, uiReady } = useAuth();

  const dispatch = useAppDispatch();
  const activeValue = useAppSelector((state) => state.sidebar.activeButton);
  const isOpenAddPost = useAppSelector((state) => state.sidebar.isOpenAddPost);

  useLayoutEffect(() => {
    const html = document.documentElement;
    html.classList.toggle('sidebar-visible', isAuth);
  }, [isAuth]);

  if (!uiReady) {
    return <SidebarSkeleton />;
  }

  const handleChange = (value: string) => {
    dispatch(setActiveButton(value));

    if (value !== OptionId.create && value !== OptionId.logout) {
      dispatch(setPreviousActiveButton(value));
    }

    if (value === OptionId.logout) {
      setConfirmOpen(true);
      return;
    }

    if (value === OptionId.create) {
      dispatch(openAddPost());
      dispatch(setCurrentStep(Steps.UploadImage));
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
      {isAuth && <Sidebar value={activeValue ?? ''} onValueChange={handleChange} />}

      {isOpenAddPost && <AddPost />}

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
