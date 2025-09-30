'use client';

import React, { useState } from 'react';
import styles from '@/src/features/auth/ui/forgot-password/ForgotPasswordForm/ForgotPasswordForm.module.scss';
import clsx from 'clsx';
import Link from 'next/link';
import { Button } from '@/src/shared/ui/Button/Button';
import { Input } from '@/src/shared/ui/Input/Input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ROUTES } from '@/src/shared/config/routes';
import { useForgotPasswordMutation } from '@/src/features/auth/api/authApi';
import {
  ForgotPasswordFormValues,
  forgotPasswordSchema
} from '@/src/features/auth/ui/forgot-password/ForgotPasswordForm/forgot-password-form.schema';
import { ResponseErrorType } from '@/src/shared/types/api';

type Props = {
  onSubmitSuccess: (email: string) => void;
};

export const ForgotPasswordForm = ({ onSubmitSuccess }: Props) => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [status, setStatus] = useState<'idle' | 'sent' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    clearErrors
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onSubmit'
  });

  const emailValue = watch('email');

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setStatus('idle');
    setErrorMessage('');

    try {
      await forgotPassword({
        email: data.email,
        recaptcha: false,
        baseUrl: process.env.NEXT_PUBLIC_APP_URL + ROUTES.AUTH.CREATE_NEW_PASSWORD
      }).unwrap();

      onSubmitSuccess(emailValue);
      setStatus('sent');
    } catch (err: unknown) {
      const emailError = (err as { status: number; data: ResponseErrorType })?.data?.messages?.find(
        (m) => m.field === 'email'
      );
      if (emailError) {
        setStatus('error');
        setErrorMessage(emailError.message);
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formContent}>
        <div className={styles.formInputs}>
          <Input
            type="email"
            label="Email"
            placeholder="Enter your email"
            {...register('email')}
            errorMessage={errors.email?.message || (status === 'error' ? errorMessage : undefined)}
            onChange={(e) => {
              register('email').onChange(e);
              if (errors.email || status === 'error') {
                clearErrors('email');
                setStatus('idle');
              }
            }}
          />

          <p className={clsx(styles.formDescription, 'regular-text-14')}>
            Enter your email address and we will send you further instructions.
          </p>

          {status === 'sent' && (
            <p className="regular-text-14">
              The link has been sent by email.
              <br />
              If you don’t receive an email, send the link again.
            </p>
          )}
        </div>

        <div className={styles.formButtons}>
          <Button
            type="submit"
            variant="buttonPrimary"
            disabled={isSubmitting || isLoading || !emailValue?.trim()}
            size={{ width: '100%' }}
          >
            {status === 'sent' ? 'Send again' : 'Send Link'}
          </Button>

          <Button asChild size={{ width: '100%' }} variant="buttonText">
            <Link href={ROUTES.AUTH.SIGN_IN}>Back to Sign In</Link>
          </Button>
        </div>
      </div>
    </form>
  );
};
