'use client';
import styles from '@/src/features/auth/ui/sign-in/SignInForm/SignInForm.module.scss';
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
        <Link
          href={{ pathname: '/auth/forgot-password' }}
          className={clsx(styles.linkForgot, ['regular-text-14'])}
          onClick={(e) => e.stopPropagation()}
        >
          Forgot Password
        </Link>
        <Button className={styles.buttonSignIn}>Sign In</Button>
      </form>
      <p className={styles.accountQuestion}>Don&apos;t have an account?</p>
      <Link href={{ pathname: '/auth/sign-up' }} className={styles.linkSignUp} onClick={(e) => e.stopPropagation()}>
        Sign Up
      </Link>
    </Card>
  );
}
