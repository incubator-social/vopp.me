'use client';
import styles from '@/src/features/auth/ui/sign-in/SignInForm/SignInForm.module.scss';
import { ROUTES } from '@/src/shared/config/routes';
import Card from '@/src/shared/ui/Card/Card';
import { Button } from '@/src/shared/ui/Button/Button';
import { Input } from '@/src/shared/ui/Input/Input';
import GoogleIcon from '@/src/shared/assets/icons/google-svgrepo-com-1.svg';
import GitHubIcon from '@/src/shared/assets/icons/github-svgrepo-com.svg';
import clsx from 'clsx';
import Link from 'next/link';

export function SignInForm() {
  return (
    <Card className={styles.container}>
      <h1>Sign In</h1>
      <div className={styles.buttonsGroup}>
        <GoogleIcon width={36} height={36} />
        <GitHubIcon width={36} height={36} />
      </div>
      <form className={styles.form}>
        <Input
          type={'email'}
          label={'Email'}
          placeholder={'Epam@epam.com'}
          containerClassName={styles.inputContainer}
        />
        <Input
          type={'password'}
          label={'Password'}
          placeholder={'**********'}
          className={styles.inputPassword}
          containerClassName={styles.inputContainer}
        />
        <Button
          className={clsx(styles.button, styles.buttonForgot)}
          asChild={true}
          variant={'buttonText'}
          size={{ minWidth: 'auto', padding: 0 }}
        >
          <Link href={{ pathname: ROUTES.AUTH.FORGOT_PASSWORD }}>Forgot Password</Link>
        </Button>
        <Button className={styles.button} type={'submit'} size={{ width: 330 }}>
          Sign In
        </Button>
      </form>
      <p className={styles.accountQuestion}>Don&apos;t have an account?</p>
      <Button asChild={true} variant={'buttonText'} className={styles.linkSignUp}>
        <Link href={{ pathname: ROUTES.AUTH.SIGN_UP }}>Sign Up</Link>
      </Button>
    </Card>
  );
}
