'use client';
import styles from './CreateNewPasswordForm.module.scss';

import { Input } from '@/src/shared/ui/Input/Input';
import { Button } from '@/src/shared/ui/Button/Button';
import { useState } from 'react';
import Card from '@/src/shared/ui/Card/Card';
import { useCreateNewPasswordMutation } from '@/src/features/auth/api/authApi';

export function CreateNewPasswordForm() {
  const [createNewPassword, { isLoading }] = useCreateNewPasswordMutation();
  const [serverError, setServerError] = useState<string | null>(null);

  const labels = {
    newPassword: 'New password',
    confirmPassword: 'Password confirmation'
  };

  return (
    <Card>
      <div className={styles.container}>
        <h1 className={styles.title}>Create New Password</h1>
        <form>
          <Input
            label={labels.newPassword}
            value={password}
            type={'password'}
            onChange={(e) => setPassword(e.target.value)}
            containerStyle={{ marginBottom: '24px' }}
          />
          <Input
            label={labels.confirmPassword}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type={'password'}
            containerStyle={{ marginBottom: '7px' }}
          />

          <span className={styles.newPassText}>Your password must be between 6 and 20 characters</span>

          <Button size={{ width: '100%' }} type={'submit'} disabled={isLoading}>
            Create new password
          </Button>
        </form>
      </div>
    </Card>
  );
}
