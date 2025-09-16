'use client';
import styles from './CreateNewPasswordForm.module.scss';

import { Input } from '@/src/shared/ui/Input/Input';
import { Button } from '@/src/shared/ui/Button/Button';

export function CreateNewPasswordForm() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create New Password</h1>

      <Input label={'New password'} type={'password'} containerStyle={{ marginBottom: '24px' }} />
      <Input label={'Password confirmation'} type={'password'} containerStyle={{ marginBottom: '7px' }} />

      <span className={styles.newPassText}>Your password must be between 6 and 20 characters</span>

      <Button size={{ width: '100%' }}>{'Create new password'}</Button>
    </div>
  );
}
