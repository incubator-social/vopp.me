'use client';

import { SignUpRequest } from '@/src/features/auth/api';
import { useRegistrationMutation } from '@/src/features/auth/api/authApi';
import { ModalDataSignUp } from '@/src/features/auth/ui/SignUp/SignUp';
import { setSignUpServerError } from '@/src/features/auth/ui/SignUp/utils';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/src/shared/ui/Button/Button';
import { Input } from '@/src/shared/ui/Input/Input';
import { Checkbox } from '@/src/shared/ui/Checkbox/Checkbox';

import styles from './SignUpForm.module.scss';
import Link from 'next/link';
import { FormValues, signUpSchema } from '@/src/features/auth/modal/signUpSchema';
import { ROUTES } from '@/src/shared/config/routes';

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
    getValues,
    clearErrors,
    formState: { errors, isSubmitting }
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
    const body = { userName: username, email, password } as SignUpRequest;
    try {
      await registration(body).unwrap();
      onModalChange?.({ open: true, email });
      reset({
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        agree: false
      });
    } catch (error) {
      setSignUpServerError(error, setError);
    }
  };

  const createFieldProps = (fieldName: keyof FormValues) => {
    const fieldRegister = register(fieldName);

    return {
      ...fieldRegister,

      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        fieldRegister.onChange(e);
        clearErrors(fieldName);
      },

      onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
        fieldRegister.onBlur(e);
        //Нужна новая валидация после ошибки сервера
        trigger(fieldName);
        if (fieldName === 'password') {
          const confirmationValue = getValues('passwordConfirmation');
          if (confirmationValue && confirmationValue.trim() !== '') {
            trigger('passwordConfirmation');
          }
        }
      }
    };
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
        <Controller
          name="passwordConfirmation"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              type="password"
              label="Password confirmation"
              placeholder="******************"
              errorMessage={fieldState.error?.message}
              className={styles.customInput}
              onChange={(e) => {
                field.onChange(e);
                clearErrors('passwordConfirmation');
              }}
            />
          )}
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
          {errors.agree && <span className={styles.checkboxError}>{errors.agree?.message}</span>}
        </div>

        <Button type="submit" variant="buttonPrimary" size={{ width: '100%' }} disabled={isSubmitting}>
          Sign Up
        </Button>
      </div>
    </form>
  );
};
