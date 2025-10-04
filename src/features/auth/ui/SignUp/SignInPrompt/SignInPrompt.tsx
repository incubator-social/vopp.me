'use client';

import { Button } from '@/src/shared/ui/Button/Button';
import styles from './SignInPrompt.module.scss';
import { ROUTES } from '@/src/shared/config/routes';
import Link from 'next/link';

export const SignInPrompt = () => {
  return (
    <div className={styles.signInSection}>
      <span>Do you have an account?</span>
      <Button asChild type="button" variant="buttonText">
        <Link href={{ pathname: ROUTES.AUTH.SIGN_IN }}>Sign In</Link>
      </Button>
    </div>
  );
};
