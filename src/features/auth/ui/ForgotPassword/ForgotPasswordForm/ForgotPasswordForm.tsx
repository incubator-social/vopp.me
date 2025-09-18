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

type ForgotPasswordForm = {
  onSuccess?: () => void;
};

export function ForgotPasswordForm({ onSuccess }: ForgotPasswordForm) {
  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema)
  });

  const [emailSent, setEmailSent] = useState(false);
  const [emailNotFound, setEmailNotFound] = useState(false);

  const onSubmit = () => {
    // демонстрация разных состояний
    const fakeEmailExists = true; // можно менять на false, чтобы показать emailNotFound
    if (fakeEmailExists) {
      setEmailSent(true);
      setEmailNotFound(false);
      onSuccess?.();
    } else {
      setEmailNotFound(true);
      setEmailSent(false);
    }
  };

  return (
    <div className={s.form}>
      <form onSubmit={rhfHandleSubmit(onSubmit)}>
        <h1>Forgot Password</h1>

        <div className={s.form__content}>
          <div className={s.form__inputs}>
            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
              {...register('email')}
              errorMessage={errors.email?.message}
            />

            {emailNotFound && (
              <p className={clsx(s.form__error, 'regular-text-14')}>User with this email doesn&apos;t exist</p>
            )}

            <p className={clsx(s.form__description, 'regular-text-14')}>
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

          <div className={s.form__buttons}>
            <Button variant="buttonPrimary" disabled={isSubmitting} size={{ width: '100%' }}>
              {emailSent ? 'Send again' : 'Send Link'}
            </Button>
            <Link href={{ pathname: '/auth/sign-in' }} className={s.form__link} onClick={(e) => e.stopPropagation()}>
              Back to Sign In
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
