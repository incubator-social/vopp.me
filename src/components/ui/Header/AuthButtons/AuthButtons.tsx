import { clsx } from 'clsx';
import { Button } from '@/src/shared/ui/button/Button';
import styles from './AuthButtons.module.scss';
import Link from 'next/link';

type AuthButtonsProps = {
  className?: string;
  onLogin: () => void;
  onSignUp: () => void;
};

export const AuthButtons = ({ className, onLogin, onSignUp }: AuthButtonsProps) => {
  return (
    <div className={clsx(styles.authButtons, className)}>
      <Link href="/login" className={styles.link}>
        <Button title="Log in" variant="buttonSecondary" onClick={onLogin} />
      </Link>
      <Link href="/register" className={styles.link}>
        <Button title="Sign up" variant="buttonPrimary" onClick={onSignUp} />
      </Link>
    </div>
  );
};
