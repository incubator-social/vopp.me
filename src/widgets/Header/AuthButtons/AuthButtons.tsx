import { clsx } from 'clsx';
import { Button } from '@/src/shared/ui/Button/Button';
import styles from './AuthButtons.module.scss';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/src/shared/config/routes';

type AuthButtonsProps = {
  className?: string;
};

export const AuthButtons = ({ className }: AuthButtonsProps) => {
  const router = useRouter();

  const handleLogin = () => {
    router.push(ROUTES.AUTH.SIGN_IN);
  };

  const handleSignUp = () => {
    router.push(ROUTES.AUTH.SIGN_UP);
  };

  return (
    <div className={clsx(styles.authButtons, className)}>
      <Button onClick={handleLogin} variant="buttonText" size={{ minWidth: 100 }}>
        Log in
      </Button>
      <Button onClick={handleSignUp} variant="buttonPrimary" size={{ minWidth: 100 }}>
        Sign up
      </Button>
    </div>
  );
};
