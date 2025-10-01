import { clsx } from 'clsx';
import { Button } from '@/src/shared/ui/Button/Button';
import styles from './AuthButtons.module.scss';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ROUTES } from '@/src/shared/config/routes';
import { useLogoutMutation, useGetMeQuery } from '@/src/features/auth/api/authApi';
import { LogoutModal } from '@/src/features/auth/ui/logout-modal/LogoutModal';

type AuthButtonsProps = {
  className?: string;
};

export const AuthButtons = ({ className }: AuthButtonsProps) => {
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
    } catch (error) {
      console.error(error);
    }
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

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        userEmail={user?.email} // Передаем email, если он есть в токене
      />
    </div>
  );
};
