import { clsx } from 'clsx';
import { Button } from '@/src/shared/ui/Button/Button';
import styles from './AuthButtons.module.scss';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ROUTES } from '@/src/shared/config/routes';
import { useLogoutMutation, useGetMeQuery } from '@/src/features/auth/api/authApi';
import { LogoutModal } from '@/src/features/auth/ui/LogoutModal/LogoutModal';
import { useAppDispatch } from '@/app/providers/store/hooks';
import { setAppError, setAppStatus } from '@/app/appSlice';
import { RequestStatus } from '@/src/shared/types/common';

type AuthButtonsProps = {
  className?: string;
};

export const AuthButtons = ({ className }: AuthButtonsProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const [logout] = useLogoutMutation();
  const { data: user } = useGetMeQuery();

  const handleLogin = () => {
    router.push('/auth/sign-in');
  };

  const handleSignUp = () => {
    router.push('/auth/sign-up');
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      setIsLogoutModalOpen(false);
      router.push(ROUTES.HOME);
    } catch {
      dispatch(setAppError({ type: 'error', message: 'Logout failed' }));
    }
  };

  // По ТЗ нужно выводить такое сообщение при клике на "NO"
  const handleClose = async () => {
    dispatch(setAppError({ type: 'success', message: "User with this email doesn't exist" }));
    setIsLogoutModalOpen(false);
  };

  return (
    <div className={clsx(styles.authButtons, className)}>
      {user ? (
        // Если пользователь залогинен, показываем кнопку "Log out"
        <Button onClick={() => setIsLogoutModalOpen(true)} variant="buttonText" size={{ minWidth: 100 }}>
          Log out
        </Button>
      ) : (
        // Если не залогинен, показываем кнопки входа и регистрации
        <>
          <Button onClick={handleLogin} variant="buttonText" size={{ minWidth: 100 }}>
            Log in
          </Button>
          <Button onClick={handleSignUp} variant="buttonPrimary" size={{ minWidth: 100 }}>
            Sign up
          </Button>
        </>
      )}

      <LogoutModal isOpen={isLogoutModalOpen} onClose={handleClose} onConfirm={handleLogout} userEmail={user?.email} />
    </div>
  );
};
