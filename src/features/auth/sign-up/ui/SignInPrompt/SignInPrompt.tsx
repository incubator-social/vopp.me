'use client';

import { Button } from '@/src/shared/ui/Button/Button';
import styles from './SignInPrompt.module.scss';

export const SignInPrompt = () => {
  return (
    <div className={styles.signInSection}>
      <span>Do you have an account?</span>
      <Button type="button" variant="buttonText" onClick={() => (window.location.href = '/auth/sign-in')}>
        Sign In
      </Button>
    </div>
  );
};
