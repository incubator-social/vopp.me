'use client';
import styles from './CreateNewPasswordForm.module.scss';
import { Input } from '@/src/shared/ui/Input/Input';
import { Button } from '@/src/shared/ui/Button/Button';
import Card from '@/src/shared/ui/Card/Card';
import { useCreateNewPasswordMutation } from '@/src/features/auth/api/authApi';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { CreateNewPasswordFormValues, createNewPasswordSchema } from './create-new-password-form.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ROUTES } from '@/src/shared/config/routes';
import { useAppDispatch } from '@/app/providers/store/hooks';
import { setAppError } from '@/app/appSlice';
import clsx from 'clsx';
import { ResponseErrorType } from '@/src/shared/types/api';

export function CreateNewPasswordForm() {
  const dispatch = useAppDispatch();
  const [createNewPassword, { isLoading }] = useCreateNewPasswordMutation();

  const searchParams = useSearchParams();
  const router = useRouter();
  const recoveryCode = searchParams.get('code');

  const {
    register,
    handleSubmit,
    setError,
    watch,
    clearErrors,
    formState: { errors }
  } = useForm<CreateNewPasswordFormValues>({
    resolver: zodResolver(createNewPasswordSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit'
  });

  const [newPassword, confirmPassword] = watch(['newPassword', 'confirmPassword']);

  const labels = {
    newPassword: 'New password',
    confirmPassword: 'Password confirmation'
  };

  const onSubmit = async (data: CreateNewPasswordFormValues) => {
    if (!recoveryCode) {
      dispatch(setAppError({ error: 'Recovery code is missing' }));
      return;
    }

    try {
      await createNewPassword({
        newPassword: data.newPassword,
        recoveryCode
      }).unwrap();
      router.push(ROUTES.AUTH.SIGN_IN);
    } catch (err: unknown) {
      const error = err as { status: number; data: ResponseErrorType };
      setError('root', {
        type: 'server',
        message: error?.data?.messages?.[0]?.message || 'Failed to set new password'
      });
    }
  };

  return (
    <Card>
      <div className={styles.container}>
        <h1 className={styles.title}>Create New Password</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label={labels.newPassword}
            type="password"
            {...register('newPassword')}
            errorMessage={errors.newPassword?.message}
            containerStyle={{ marginBottom: '24px' }}
            placeholder="******************"
            onChange={(e) => {
              register('newPassword').onChange(e);
              if (errors.newPassword) {
                clearErrors('newPassword');
              }
            }}
          />
          <Input
            label={labels.confirmPassword}
            type="password"
            {...register('confirmPassword')}
            placeholder="******************"
            errorMessage={errors.confirmPassword?.message}
            containerStyle={{ marginBottom: '7px' }}
            onChange={(e) => {
              register('confirmPassword').onChange(e);
              if (errors.confirmPassword) {
                clearErrors('confirmPassword');
              }
            }}
          />

          <span className={styles.newPassText}>
            Your password must be between 6 and 20 characters <br />
            {errors.root && <span className={clsx('regular-text-14', styles.errorText)}>{errors.root.message}</span>}
          </span>

          <Button size={{ width: '100%' }} type="submit" disabled={isLoading || !newPassword || !confirmPassword}>
            Create new password
          </Button>
        </form>
      </div>
    </Card>
  );
}
