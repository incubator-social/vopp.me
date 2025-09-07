import { clsx } from 'clsx';
import { Button } from '@/src/shared/ui/Button/Button';
import styles from './AuthButtons.module.scss';
import Link from 'next/link';

type AuthButtonsProps = {
  className?: string;
};

export const AuthButtons = ({ className }: AuthButtonsProps) => {
  return (
    <div className={clsx(styles.authButtons, className)}>
      <Link href="/login" className={styles.link}>
        <Button variant="buttonText" minWidth={100}>
          Log in
        </Button>
      </Link>
      <Link href="/register" className={styles.link}>
        <Button variant="buttonPrimary" minWidth={100}>
          Sign up
        </Button>
      </Link>
    </div>
  );
};
