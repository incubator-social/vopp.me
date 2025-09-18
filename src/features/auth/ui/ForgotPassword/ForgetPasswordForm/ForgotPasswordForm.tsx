'use client';

import React, { useState } from 'react';
import { Button } from '@/src/shared/ui/Button/Button';
import { Input } from '@/src/shared/ui/Input/Input';
import s from '@/src/features/auth/ui/ForgotPassword/ForgetPasswordForm/ForgotPasswordForm.module.scss';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ForgotPasswordFormValues,
  forgotPasswordSchema
} from '@/src/features/auth/ui/ForgotPassword/ForgetPasswordForm/forgot-password-form.schema';
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

  const onSubmit = (data: ForgotPasswordFormValues) => {
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
    <form onSubmit={rhfHandleSubmit(onSubmit)} className={s.form}>
      <h1>Forgot Password</h1>

      <div className={s.form_content}>
        <div className={s.form_inputs}>
          <Input
            type="email"
            label="Email"
            placeholder="Enter your email"
            {...register('email')}
            errorMessage={errors.email?.message}
          />

          {emailNotFound && (
            <p className={clsx(s.form_error, 'regular-text-14')}>User with this email doesn&apos;t exist</p>
          )}

          <p className={clsx(s.form_description, 'regular-text-14')}>
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

        <div className={s.form_buttons}>
          <Button variant="buttonPrimary" disabled={isSubmitting}>
            {emailSent ? 'Send again' : 'Send Link'}
          </Button>
          <Button variant="buttonText" disabled={isSubmitting}>
            <Link href="./sign-in" className={s.form_link}>
              Back to Sign In
            </Link>
          </Button>
        </div>
      </div>
    </form>
  );
}
