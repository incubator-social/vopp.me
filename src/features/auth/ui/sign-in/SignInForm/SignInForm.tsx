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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLoginMutation } from '@/src/features/auth/api';
import { FormValues, signInSchema } from '@/src/features/auth/modal/signInSchema';
import { useRouter } from 'next/navigation';
import { setFormApiError } from '@/src/shared/lib/auth/setFormApiError';
import { useState } from 'react';

export function SignInForm() {
  const [login] = useLoginMutation();
  const router = useRouter();
  const [shake, setShake] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors, isSubmitting, isValid, isDirty }
  } = useForm<FormValues>({
    resolver: zodResolver(signInSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const handleFieldChange = (fieldName: keyof FormValues) => {
    clearErrors(fieldName);
  };

  const onSubmit = async ({ email, password }: FormValues) => {
    try {
      await login({ email, password }).unwrap();
      reset();
      router.push(ROUTES.PROFILE);
    } catch (error) {
      setFormApiError(error, setError, 'password');
      setShake(false);
      requestAnimationFrame(() => setShake(true));
    }
  };

  const onInvalid = () => {
    setShake(false);
    requestAnimationFrame(() => setShake(true));
  };

  return (
    <Card className={styles.container}>
      <h1>Sign In</h1>
      <div className={styles.buttonsGroup}>
        <GoogleIcon width={36} height={36} />
        <GitHubIcon width={36} height={36} />
      </div>
      <form
        className={clsx(styles.form, shake && styles.shake)}
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        onAnimationEnd={() => setShake(false)}
      >
        <Input
          {...register('email', {
            onChange: () => handleFieldChange('email')
          })}
          type={'email'}
          label={'Email'}
          placeholder={'Epam@epam.com'}
          containerClassName={styles.inputContainer}
          errorMessage={errors.email?.message}
        />
        <Input
          {...register('password', {
            onChange: () => handleFieldChange('password')
          })}
          type={'password'}
          label={'Password'}
          placeholder={'**********'}
          className={styles.inputPassword}
          containerClassName={styles.inputContainer}
          errorMessage={errors.password?.message}
        />
        <Button
          className={clsx(styles.button, styles.buttonForgot)}
          asChild={true}
          variant={'buttonText'}
          size={{ minWidth: 'auto', padding: 0 }}
        >
          <Link href={{ pathname: ROUTES.AUTH.FORGOT_PASSWORD }}>Forgot Password</Link>
        </Button>
        <Button
          className={styles.button}
          type={'submit'}
          size={{ width: 330 }}
          disabled={!isValid || !isDirty || isSubmitting}
        >
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>
      <p className={styles.accountQuestion}>Don&apos;t have an account?</p>
      <Button asChild={true} variant={'buttonText'} className={styles.linkSignUp}>
        <Link href={{ pathname: ROUTES.AUTH.SIGN_UP }}>Sign Up</Link>
      </Button>
    </Card>
  );
}
