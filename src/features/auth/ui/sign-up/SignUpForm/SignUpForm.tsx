'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/src/shared/ui/Button/Button';
import { Input } from '@/src/shared/ui/Input/Input';
import { Checkbox } from '@/src/shared/ui/Checkbox/Checkbox';

import styles from './SignUpForm.module.scss';
import Link from 'next/link';
import { FormValues, signUpSchema } from '@/src/features/auth/ui/sign-up/SignUpForm/signUpSchema';
import { ROUTES } from '@/src/shared/config/routes';

export const SignUpForm = () => {
  const {
    control,
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(signUpSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      agree: false
    }
  });

  const createFieldProps = (fieldName: keyof FormValues) => {
    const fieldRegister = register(fieldName);

    return {
      ...fieldRegister,
      onChange: async (e: React.ChangeEvent<HTMLInputElement>) => {
        await fieldRegister.onChange(e);
        clearErrors(fieldName);
      }
    };
  };
  const onSubmit = (data: FormValues) => {
    console.log('Form data:', data);
    // Здесь потом будет отправка на бэкенд
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Input
        {...createFieldProps('username')}
        label="Username"
        placeholder="Enter your username"
        errorMessage={errors.username?.message}
        className={styles.customInput}
      />

      <Input
        {...createFieldProps('email')}
        type="email"
        label="Email"
        placeholder="example@gmail.com"
        errorMessage={errors.email?.message}
        className={styles.customInput}
      />

      <Input
        {...createFieldProps('password')}
        type="password"
        label="Password"
        placeholder="******************"
        errorMessage={errors.password?.message}
        className={styles.customInput}
      />

      <div className={styles.specialGap}>
        <Input
          {...createFieldProps('passwordConfirmation')}
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
                  field.onChange(checked === true);
                }}
                onBlur={field.onBlur}
                label={
                  <span className={styles.checkboxLabel}>
                    I agree to the{' '}
                    <Link href={{ pathname: ROUTES.LEGAL.TERMS_OF_SERVICE }} className={styles.link}>
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href={{ pathname: ROUTES.LEGAL.PRIVACY }} className={styles.link}>
                      Privacy Policy
                    </Link>
                  </span>
                }
              />
            )}
          />
        </div>

        <Button type="submit" variant="buttonPrimary" size={{ width: '100%' }} disabled={isSubmitting}>
          Sign Up
        </Button>
      </div>
    </form>
  );
};
