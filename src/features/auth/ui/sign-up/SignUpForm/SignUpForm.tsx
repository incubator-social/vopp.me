'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/src/shared/ui/Button/Button';
import { Input } from '@/src/shared/ui/Input/Input';
import { Checkbox } from '@/src/shared/ui/Checkbox/Checkbox';

import styles from './SignUpForm.module.scss';
import Link from 'next/link';
import { FormValues, signUpSchema } from '@/src/features/auth/ui/sign-up/SignUpForm/signUpSchema';

export const SignUpForm = () => {
  const {
    trigger,
    control,
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty }
  } = useForm<FormValues>({
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      agree: false
    }
  });

  const onSubmit = (data: FormValues) => {
    console.log('Form data:', data);
    // Здесь потом будет отправка на бэкенд
  };

  const isSubmitDisabled = !isValid || !isDirty;
  // const isSubmitDisabled = false; //Расскомментировать, чтобы раздизэйблить кнопку, не заполняя данные формы, а
  //верхний isSubmitDisabled задизэйблить

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Input
        {...register('username', {
          onBlur: () => trigger('username')
        })}
        label="Username"
        placeholder="Enter your username"
        errorMessage={errors.username?.message}
        containerClassName={styles.field}
        className={styles.customInput}
      />

      <Input
        {...register('email', {
          onBlur: () => trigger('username')
        })}
        type="email"
        label="Email"
        placeholder="Epam@epam.com"
        errorMessage={errors.email?.message}
        containerClassName={styles.field}
        className={styles.customInput}
      />

      <Input
        {...register('password', {
          onBlur: () => trigger('username')
        })}
        type="password"
        label="Password"
        placeholder="Enter your password"
        errorMessage={errors.password?.message}
        containerClassName={styles.field}
        className={styles.customInput}
      />

      <div className={styles.specialGap}>
        <Input
          {...register('passwordConfirmation', {
            onBlur: () => trigger('username')
          })}
          type="password"
          label="Password confirmation"
          placeholder="Confirm your password"
          errorMessage={errors.passwordConfirmation?.message}
          className={styles.customInput}
        />

        <Controller
          name="agree"
          control={control}
          render={({ field }) => (
            <Checkbox
              checked={field.value}
              onCheckedChange={(checked) => {
                field.onChange(checked === true);
                trigger('agree');
              }}
              onBlur={field.onBlur}
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

        {errors.agree && <span style={{ color: 'red', fontSize: '14px' }}>{errors.agree.message}</span>}

        <Button type="submit" variant="buttonPrimary" size={{ width: '100%' }} disabled={isSubmitDisabled}>
          Sign Up
        </Button>
      </div>
    </form>
  );
};
