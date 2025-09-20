'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/src/shared/ui/Button/Button';
import styles from './SignInPrompt.module.scss';

export const SignInPrompt = () => {
  const router = useRouter();

  const handleSignInClick = () => {
    router.push('/auth/sign-in');
  };

  return (
    <div className={styles.signInSection}>
      <span>Do you have an account?</span>
      <Button type="button" variant="buttonText" onClick={handleSignInClick}>
        Sign In
      </Button>
    </div>
  );
};
