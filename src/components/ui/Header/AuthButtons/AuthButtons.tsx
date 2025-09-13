import { clsx } from 'clsx';
import { Button } from '@/src/shared/ui/Button/Button';
import styles from './AuthButtons.module.scss';
import { useRouter } from 'next/navigation';

type AuthButtonsProps = {
  className?: string;
};

export const AuthButtons = ({ className }: AuthButtonsProps) => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  const handleSignUp = () => {
    router.push('/registration');
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
