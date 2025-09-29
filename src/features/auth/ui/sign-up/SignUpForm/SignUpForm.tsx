'use client';

import { useRegistrationMutation } from '@/src/features/auth/api/authApi';
import { ModalDataSignUp } from '@/src/features/auth/ui/sign-up/SignUpPage';
import { handleErrorSignUp } from '@/src/features/auth/ui/sign-up/utils/handleErrorSignUp';
import { ChangeEvent } from 'react';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/src/shared/ui/Button/Button';
import { Input } from '@/src/shared/ui/Input/Input';
import { Checkbox } from '@/src/shared/ui/Checkbox/Checkbox';

import styles from './SignUpForm.module.scss';
import Link from 'next/link';
import { FormValues, signUpSchema } from '@/src/features/auth/ui/sign-up/SignUpForm/signUpSchema';

type SignUpForm = {
  onModalChange?: (data: ModalDataSignUp) => void;
};

export const SignUpForm = ({ onModalChange }: SignUpForm) => {
  const [registration] = useRegistrationMutation();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(signUpSchema),
    mode: 'onTouched',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      agree: false
    }
  });

  const onSubmit = async ({ username, email, password }: Partial<FormValues>) => {
    const body = { userName: username, email, password };
    try {
      await registration(body).unwrap();
      onModalChange?.({ open: true, email });
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <p>zxccxz@mailsac.com</p>
      <p>Pnar999</p>
      <p>Lfdsfoe134!!</p>

      <Input
        {...register('username')}
        label="Username"
        placeholder="Enter your username"
        errorMessage={handleErrorSignUp(errors.username?.message)}
        className={styles.customInput}
      />

      <Input
        {...register('email')}
        type="email"
        label="Email"
        placeholder="Epam@epam.com"
        errorMessage={handleErrorSignUp(errors.email?.message)}
        className={styles.customInput}
      />

      <Input
        {...register('password')}
        type="password"
        label="Password"
        placeholder="******************"
        errorMessage={handleErrorSignUp(errors.password?.message)}
        className={styles.customInput}
      />

      <div className={styles.specialGap}>
        <Input
          {...register('passwordConfirmation')}
          type="password"
          label="Password confirmation"
          placeholder="******************"
          errorMessage={handleErrorSignUp(errors.passwordConfirmation?.message)}
          className={styles.customInput}
        />

        <div className={styles.checkboxWrapper}>
          <Controller
            name="agree"
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onCheckedChange={(checked) => {
                  field.onChange(checked);
                }}
                label={
                  <span className={styles.checkboxLabel}>
                    I agree to the{' '}
                    <Link href="/legal/terms" className={styles.link}>
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/legal/privacy" className={styles.link}>
                      Privacy Policy
                    </Link>
                  </span>
                }
              />
            )}
          />
          {errors.agree && <span className={styles.checkboxError}>{handleErrorSignUp(errors.agree?.message)}</span>}
        </div>

        <Button
          type="submit"
          variant="buttonPrimary"
          size={{ width: '100%' }}
          disabled={!isValid || !isDirty || isSubmitting}
        >
          Sign Up
        </Button>
      </div>
    </form>
  );
};
