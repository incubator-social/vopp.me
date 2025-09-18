'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/src/shared/ui/Button/Button';
import { Input } from '@/src/shared/ui/Input/Input';
import { Checkbox } from '@/src/shared/ui/Checkbox/Checkbox';

import styles from './SignUpForm.module.scss';
import Link from 'next/link';

const signUpSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(30, 'Maximum number of characters is 30'),
    email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
    password: z.string().min(6, 'Minimum number of characters is 6'),
    passwordConfirmation: z.string(),
    agree: z.boolean().refine((val) => val === true, {
      // ← Добавить refine для обязательной галочки
      message: 'You must agree to terms and conditions'
    })
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ['passwordConfirmation']
  });

// Тип для данных формы
type FormValues = z.infer<typeof signUpSchema>;

export const SignUpForm = () => {
  const {
    watch,
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      agree: false
    }
  });

  // const onSubmit = (data: FormValues) => {
  //   console.log('Form data:', data);
  //   // Здесь потом будет отправка на бэкенд
  // };
  const agreeValue = watch('agree');
  console.log('🔍 Live checkbox value:', agreeValue);

  const onSubmit = (data: FormValues) => {
    console.log('🎯 Submit data:', data);
    console.log('🔎 Checkbox details:', {
      value: data.agree,
      type: typeof data.agree,
      isValid: data.agree === true
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Input
        {...register('username')}
        label="Username"
        placeholder="Enter your username"
        errorMessage={errors.username?.message}
        containerClassName={styles.field}
        className={styles.customInput}
      />

      <Input
        {...register('email')}
        type="email"
        label="Email"
        placeholder="Epam@epam.com"
        errorMessage={errors.email?.message}
        containerClassName={styles.field}
        className={styles.customInput}
      />

      <Input
        {...register('password')}
        type="password"
        label="Password"
        placeholder="Enter your password"
        errorMessage={errors.password?.message}
        containerClassName={styles.field}
        className={styles.customInput}
      />

      <div className={styles.specialGap}>
        <Input
          {...register('passwordConfirmation')}
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
              }}
              label={
                <span>
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

        {/* Добавить отображение ошибки для чекбокса */}
        {errors.agree && <span style={{ color: 'red', fontSize: '14px' }}>{errors.agree.message}</span>}

        <Button type="submit" variant="buttonPrimary" size={{ width: '100%' }}>
          Sign Up
        </Button>
      </div>
    </form>
  );
};
