'use client';
import styles from 'src/features/auth/ui/sign-in/SignInForm/SignInForm.module.scss';
import Card from 'src/shared/ui/Card/Card';
import { Button } from 'src/shared/ui/Button/Button';
import GoogleIcon from 'src/shared/assets/icons/google-svgrepo-com-1.svg';
import GitHubIcon from 'src/shared/assets/icons/github-svgrepo-com.svg';

export function SignInForm() {
  return (
    <Card className={styles.container}>
      <h1 className={styles.h1}>Sign In</h1>
      <div className={styles.buttonsGroup}>
        <Button
          size={{ minWidth: 36, minHeight: 36, width: 36, height: 36, padding: 0 }}
          variant={'buttonText'}
          className={styles.button}
        >
          <GoogleIcon width={'36px'} height={'36px'} />
        </Button>
        <Button
          size={{ minWidth: 36, minHeight: 36, width: 36, height: 36, padding: 0 }}
          variant={'buttonText'}
          className={styles.button}
        >
          <GitHubIcon width={'36px'} height={'36px'} />
        </Button>
      </div>
    </Card>
  );
}
