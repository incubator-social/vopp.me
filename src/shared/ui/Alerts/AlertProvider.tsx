'use client';

import * as Toast from '@radix-ui/react-toast';
import { ReactNode } from 'react';
import styles from '@/src/shared/ui/Alerts/alert.module.scss';
import { useAppDispatch, useAppSelector } from '@/app/providers/store/hooks';
import { Alert } from '@/src/shared/ui/Alerts/Alert';
import { clearAppError, selectAppError } from '@/app/appSlice';

import { confirmLinkErrorMessage } from '@/src/features/auth/ui/ConfirmCodePage/utils/confirm-link-handle-error';

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const error = useAppSelector(selectAppError);
  const dispatch = useAppDispatch();

  return (
    <Toast.Provider swipeDirection="right">
      {children}

      {error && error !== confirmLinkErrorMessage.invalid && (
        <Alert type="error" message={error} onClose={() => dispatch(clearAppError())} />
      )}
      <Toast.Viewport className={styles.viewport} />
    </Toast.Provider>
  );
};
