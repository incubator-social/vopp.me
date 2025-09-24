'use client';

import React, { useState } from 'react';
import s from '@/src/features/auth/ui/forgot-password/ForgotPasswordForm/ForgotPasswordForm.module.scss';
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

type Props = {
  onSubmitSuccess: (email: string) => void;
  onSubmitError: (error: string | null) => void;
};

export const ForgotPasswordForm = ({ onSubmitSuccess, onSubmitError }: Props) => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors },
    watch
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit'
  });

  const emailValue = watch('email');
  const [emailSent, setEmailSent] = useState(false);
  const [emailNotFound, setEmailNotFound] = useState(false);

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    // try {
    //   await forgotPassword({
    //     email: data.email,
    //     recaptcha: false,
    //     baseUrl: 'http://localhost:3000'
    //   }).unwrap();
    //
    //   onSubmitSuccess(emailValue);
    //   setEmailSent(true);
    //   setEmailNotFound(false);
    // } catch (err: unknown) {
    //   const { fieldErrors, message } = handleApiError(err);
    //   if (fieldErrors?.email) {
    //     setEmailNotFound(true);
    //     setServerError(fieldErrors.email);
    //   } else {
    //     setEmailNotFound(false);
    //     onSubmitError(message ?? 'Unknown error');
    //   }
    //   setEmailSent(false);
    // }
  };

  return (
    <form className={s.form} onSubmit={rhfHandleSubmit(onSubmit)}>
      <h1>Forgot Password</h1>
      <div className={s.formContent}>
        <div className={s.formInputs}>
          <Input
            type="email"
            label="Email"
            placeholder="Enter your email"
            {...register('email')}
            errorMessage={errors.email?.message}
          />

          {emailNotFound && <p className={clsx(s.formError, 'regular-text-14')}>{serverError}</p>}

          <p className={clsx(s.formDescription, 'regular-text-14')}>
            Enter your email address and we will send you further instructions.
          </p>

          {emailSent && (
            <p className="regular-text-14">
              The link has been sent by email.
              <br />
              If you don’t receive an email send link again.
            </p>
          )}
        </div>
        <div className={s.formButtons}>
          <Button
            type="submit"
            variant="buttonPrimary"
            disabled={isLoading || !emailValue?.trim()}
            size={{ width: '100%' }}
          >
            {emailSent ? 'Send again' : 'Send Link'}
          </Button>
          <Button asChild size={{ width: '100%' }} variant="buttonText">
            <Link href={ROUTES.AUTH.SIGN_IN}>Back to Sign In</Link>
          </Button>
        </div>
      </div>
    </form>
  );
};
