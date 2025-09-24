'use client';

import { useRegistrationMutation } from '@/src/features/auth/api/authApi';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/src/shared/ui/Button/Button';
import { Input } from '@/src/shared/ui/Input/Input';
import { Checkbox } from '@/src/shared/ui/Checkbox/Checkbox';

import styles from './SignUpForm.module.scss';
import Link from 'next/link';
import { FormValues, signUpSchema } from '@/src/features/auth/ui/sign-up/SignUpForm/signUpSchema';
import { useState } from 'react';

type SignUpForm = {
  onOpenModal: (isModal: boolean) => void;
};

export const SignUpForm = ({ onOpenModal }: SignUpForm) => {
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [fieldValuesChanged, setFieldValuesChanged] = useState<Set<string>>(new Set());

  const [registration] = useRegistrationMutation();

  const {
    trigger,
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty }
  } = useForm<FormValues>({
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
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
      onOpenModal(true);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const handleFieldBlur = (fieldName: keyof FormValues) => {
    setTouchedFields((prev) => new Set(prev).add(fieldName as string));
    setFieldValuesChanged((prev) => {
      const newSet = new Set(prev);
      newSet.delete(fieldName as string);
      return newSet;
    });
    trigger(fieldName);
  };

  const handleFieldChange = (fieldName: keyof FormValues) => {
    setFieldValuesChanged((prev) => new Set(prev).add(fieldName as string));
  };

  const shouldShowError = (fieldName: string) => {
    return touchedFields.has(fieldName) && !fieldValuesChanged.has(fieldName);
  };

  const isSubmitDisabled = !isValid || !isDirty;
  // const isSubmitDisabled = false; //Расскомментировать, чтобы раздизэйблить кнопку, не заполняя данные формы, а
  //верхний isSubmitDisabled задизэйблить

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <p>iwabmzqq@sharklasers.com</p>
      <p>Valera123</p>
      <p>Lkjnd32!!</p>
      <Input
        {...register('username', {
          onChange: () => handleFieldChange('username')
        })}
        onBlur={() => handleFieldBlur('username')}
        label="Username"
        placeholder="Enter your username"
        errorMessage={shouldShowError('username') ? errors.username?.message : ''}
        className={styles.customInput}
      />

      <Input
        {...register('email', {
          onChange: () => handleFieldChange('email')
        })}
        onBlur={() => handleFieldBlur('email')}
        type="email"
        label="Email"
        placeholder="Epam@epam.com"
        errorMessage={shouldShowError('email') ? errors.email?.message : ''}
        className={styles.customInput}
      />

      <Input
        {...register('password', {
          onChange: () => handleFieldChange('password')
        })}
        onBlur={() => handleFieldBlur('password')}
        type="password"
        label="Password"
        placeholder="******************"
        errorMessage={shouldShowError('password') ? errors.password?.message : ''}
        className={styles.customInput}
      />

      <div className={styles.specialGap}>
        <Input
          {...register('passwordConfirmation', {
            onChange: () => handleFieldChange('passwordConfirmation')
          })}
          onBlur={() => handleFieldBlur('passwordConfirmation')}
          type="password"
          label="Password confirmation"
          placeholder="******************"
          errorMessage={shouldShowError('passwordConfirmation') ? errors.passwordConfirmation?.message : ''}
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
          {errors.agree && <span className={styles.checkboxError}>{errors.agree.message}</span>}
        </div>

        <Button type="submit" variant="buttonPrimary" size={{ width: '100%' }} disabled={isSubmitDisabled}>
          Sign Up
        </Button>
      </div>
    </form>
  );
};
