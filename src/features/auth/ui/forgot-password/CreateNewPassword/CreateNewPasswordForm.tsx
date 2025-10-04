'use client';
import styles from '@/src/features/auth/ui/forgot-password/CreateNewPassword/CreateNewPasswordForm.module.scss';
import { Input } from '@/src/shared/ui/Input/Input';
import { Button } from '@/src/shared/ui/Button/Button';
import Card from '@/src/shared/ui/Card/Card';
import { useCheckRecoveryCodeMutation, useCreateNewPasswordMutation } from '@/src/features/auth/api/authApi';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ROUTES } from '@/src/shared/config/routes';
import { useAppDispatch } from '@/app/providers/store/hooks';
import { setAppError } from '@/app/appSlice';
import clsx from 'clsx';
import {
  CreateNewPasswordFormValues,
  createNewPasswordSchema
} from '@/src/features/auth/ui/forgot-password/CreateNewPassword/createNewPasswordFormSchema';
import { ErrorResponse } from '@/src/features/auth/lib/types/api.types';
import { use, useEffect } from 'react';

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export const CreateNewPasswordForm = ({ searchParams }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const code = use(searchParams).code;

  const [checkRecoveryCode, { isLoading }] = useCheckRecoveryCodeMutation();
  const [createNewPassword] = useCreateNewPasswordMutation();

  useEffect(() => {
    if (!code) {
      dispatch(setAppError({ error: 'Recovery code is missing' }));
      return;
    }

    const validateCode = async () => {
      try {
        await checkRecoveryCode({ recoveryCode: code }).unwrap();
      } catch (err: unknown) {
        const error = err as { status: number; data: ErrorResponse };
        if (error.data.messages?.[0]?.message === 'Code is not valid') {
          router.replace(ROUTES.AUTH.EMAIL_VERIFICATION_EXPIRED);
        } else {
          dispatch(setAppError({ error: error?.data?.messages?.[0]?.message || 'Something went wrong' }));
        }
      }
    };

    validateCode();
  }, [code, checkRecoveryCode, router, dispatch]);

  const {
    register,
    handleSubmit,
    setError,
    watch,
    clearErrors,
    formState: { errors, isSubmitting }
  } = useForm<CreateNewPasswordFormValues>({
    resolver: zodResolver(createNewPasswordSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit'
  });

  if (isLoading) {
    return <div>Checking link...</div>;
  }

  const [newPassword, confirmPassword] = watch(['newPassword', 'confirmPassword']);

  const labels = {
    newPassword: 'New password',
    confirmPassword: 'Password confirmation'
  };

  const onSubmit = async (data: CreateNewPasswordFormValues) => {
    if (!code) {
      dispatch(setAppError({ error: 'Recovery code is missing' }));
      return;
    }
    try {
      await createNewPassword({
        newPassword: data.newPassword,
        recoveryCode: code
      }).unwrap();
      router.push(ROUTES.AUTH.SIGN_IN);
    } catch (err: unknown) {
      const error = err as { status: number; data: ErrorResponse };
      setError('root', {
        type: 'server',
        message: error?.data?.messages?.[0]?.message || 'Failed to set new password'
      });
    }
  };

  const createInputProps = (fieldName: keyof CreateNewPasswordFormValues) => {
    const fieldRegister = register(fieldName);

    return {
      ...fieldRegister,
      errorMessage: errors[fieldName]?.message,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        fieldRegister.onChange(e);
        if (errors[fieldName]) {
          clearErrors(fieldName);
        }
      },
      onBlur: fieldRegister.onBlur,
      type: 'password' as const,
      placeholder: '******************'
    };
  };

  return (
    <Card>
      <div className={styles.container}>
        <h1 className={styles.title}>Create New Password</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label={labels.newPassword}
            containerStyle={{ marginBottom: '24px' }}
            {...createInputProps('newPassword')}
          />
          <Input
            label={labels.confirmPassword}
            containerStyle={{ marginBottom: '24px' }}
            {...createInputProps('confirmPassword')}
          />

          <span className={styles.newPassText}>
            Your password must be between 6 and 20 characters <br />
            {errors.root && <span className={clsx('regular-text-14', styles.errorText)}>{errors.root.message}</span>}
          </span>

          <Button size={{ width: '100%' }} type="submit" disabled={isSubmitting || !newPassword || !confirmPassword}>
            Create new password
          </Button>
        </form>
      </div>
    </Card>
  );
};
