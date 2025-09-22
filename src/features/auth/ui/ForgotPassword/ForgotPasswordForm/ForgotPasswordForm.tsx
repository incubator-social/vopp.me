'use client';

import React, { useState } from 'react';
import { Button } from '@/src/shared/ui/Button/Button';
import { Input } from '@/src/shared/ui/Input/Input';
import s from '@/src/features/auth/ui/ForgotPassword/ForgotPasswordForm/ForgotPasswordForm.module.scss';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ForgotPasswordFormValues,
  forgotPasswordSchema
} from '@/src/features/auth/ui/ForgotPassword/ForgotPasswordForm/forgot-password-form.schema';
import clsx from 'clsx';
import Link from 'next/link';
import { ResponseErrorType, useForgotPasswordMutation } from '@/src/features/auth/api/authApi';

export const ForgotPasswordForm = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors }
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema)
  });

  const [emailSent, setEmailSent] = useState(false);
  const [emailNotFound, setEmailNotFound] = useState(false);

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      debugger;
      console.log('try sending');
      const result = await forgotPassword({
        email: data.email,
        recaptcha: false,
        baseUrl: 'http://localhost:3000'
      }).unwrap();

      console.log(result);
      setEmailSent(true);
      setEmailNotFound(false);
    } catch (err: unknown) {
      const error = err as { status?: number; data?: ResponseErrorType };
      if (error?.status === 400) {
        setEmailNotFound(true);
        setEmailSent(false);
        setServerError(error?.data?.messages?.[0]?.message ?? 'Unknown error');
        console.error(error);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className={s.form}>
      <form onSubmit={rhfHandleSubmit(onSubmit)}>
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
            <Button type="submit" variant="buttonPrimary" disabled={isLoading} size={{ width: '100%' }}>
              {emailSent ? 'Send again' : 'Send Link'}
            </Button>
            <Link href={{ pathname: '/auth/sign-in' }} className={s.formLink} onClick={(e) => e.stopPropagation()}>
              Back to Sign In
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
