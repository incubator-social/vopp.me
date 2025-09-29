'use client';

import { useRegistrationMutation } from '@/src/features/auth/api/authApi';
import { ModalDataSignUp } from '@/src/features/auth/ui/sign-up/SignUpPage';
import { setSignUpServerError } from '@/src/features/auth/ui/sign-up/utils/setSignUpServerError';

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
    trigger,
    control,
    register,
    handleSubmit,
    reset,
    setError,
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
      reset({
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        agree: true
      });
    } catch (error) {
      setSignUpServerError(error, setError);
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Input
        {...register('username')}
        label="Username"
        placeholder="Enter your username"
        errorMessage={errors.username?.message}
        className={styles.customInput}
      />

      <Input
        {...register('email')}
        type="email"
        label="Email"
        placeholder="Epam@epam.com"
        errorMessage={errors.email?.message}
        className={styles.customInput}
      />

      <Input
        {...register('password')}
        type="password"
        label="Password"
        placeholder="******************"
        errorMessage={errors.password?.message}
        className={styles.customInput}
      />

      <div className={styles.specialGap}>
        <Input
          {...register('passwordConfirmation')}
          type="password"
          label="Password confirmation"
          placeholder="******************"
          errorMessage={errors.passwordConfirmation?.message}
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
                  void trigger('agree');
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
          {errors.agree && <span className={styles.checkboxError}>{errors.agree?.message}</span>}
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
