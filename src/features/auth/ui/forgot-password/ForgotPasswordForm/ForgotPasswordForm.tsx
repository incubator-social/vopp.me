'use client';

import React, { useRef, useState } from 'react';
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
  forgotPasswordFormSchema,
  ForgotPasswordFormValues
} from '@/src/features/auth/ui/forgot-password/ForgotPasswordForm/forgotPasswordFormSchema';
import { ErrorResponse } from '@/src/features/auth/lib/types/api.types';
import { Recaptcha } from '@/src/shared/ui/Recaptcha/Recaptcha';
import { ForgotPasswordStatus } from '@/src/features/auth/lib/types/auth.types';
import ReCAPTCHA from 'react-google-recaptcha';

type Props = {
  onSubmitSuccess: (email: string) => void;
};

export const ForgotPasswordForm = ({ onSubmitSuccess }: Props) => {
  const [forgotPassword] = useForgotPasswordMutation();
  const [status, setStatus] = useState<ForgotPasswordStatus>(ForgotPasswordStatus.Idle);
  const [captchaValue, setCaptchaValue] = useState<string | null>('');
  const [captchaError, setCaptchaError] = useState<string | null>(null);

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaError(null);
    setCaptchaValue(value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setError,
    clearErrors
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordFormSchema),
    mode: 'onSubmit'
  });

  const emailValue = watch('email');

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setStatus(ForgotPasswordStatus.Idle);

    if (captchaValue === '') {
      setCaptchaError('Please complete the captcha');
      return;
    }

    try {
      await forgotPassword({
        email: data.email,
        recaptcha: captchaValue,
        baseUrl: process.env.NEXT_PUBLIC_APP_URL + ROUTES.AUTH.CREATE_NEW_PASSWORD
      }).unwrap();

      onSubmitSuccess(emailValue);
      setStatus(ForgotPasswordStatus.Sent);
    } catch (err: unknown) {
      const emailError = (err as { status: number; data: ErrorResponse })?.data?.messages?.find(
        (m) => m.field === 'email'
      );
      if (emailError) {
        setStatus(ForgotPasswordStatus.Error);
        setError('email', {
          type: 'server',
          message: emailError.message
        });

        setCaptchaValue(null);
        recaptchaRef.current?.reset();
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
            errorMessage={errors.email?.message}
            onChange={(e) => {
              register('email').onChange(e);
              if (errors.email || status === 'error') {
                clearErrors('email');
                setStatus(ForgotPasswordStatus.Idle);
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
            disabled={isSubmitting || !emailValue?.trim() || !captchaValue}
            size={{ width: '100%' }}
          >
            {status === 'sent' ? 'Send again' : 'Send Link'}
          </Button>

          <Button asChild size={{ width: '100%' }} variant="buttonText">
            <Link href={ROUTES.AUTH.SIGN_IN}>Back to Sign In</Link>
          </Button>
        </div>
        <Recaptcha ref={recaptchaRef} className={styles.recaptcha} onChangeAction={handleCaptchaChange} />
        {captchaError && <span className={clsx(styles.formError, 'regular-text-14')}>{captchaError}</span>}
      </div>
    </form>
  );
};
