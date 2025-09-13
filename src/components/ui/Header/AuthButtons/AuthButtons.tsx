import { clsx } from 'clsx';
import { Button } from '@/src/shared/ui/Button/Button';
import styles from './AuthButtons.module.scss';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
      <Button onClick={handleLogin} variant="buttonText" minWidth={100}>
        Log in
      </Button>
      <Button onClick={handleSignUp} variant="buttonPrimary" minWidth={100}>
        Sign up
      </Button>
      {/*<Link href="/register" className={styles.link}>*/}
      {/*  <Button variant="buttonPrimary" minWidth={100}>*/}
      {/*    Log in*/}
      {/*  </Button>*/}
      {/*</Link>*/}
      {/*<Link href="/login" className={styles.link}>*/}
      {/*  <Button variant="buttonText" minWidth={100}>*/}
      {/*    Log in*/}
      {/*  </Button>*/}
      {/*</Link>*/}
    </div>
  );
};
