'use client';

import * as Toast from '@radix-ui/react-toast';
import { ReactNode } from 'react';
import styles from '@/src/shared/ui/Alerts/alert.module.scss';
import { useAppDispatch, useAppSelector } from '@/app/providers/store/hooks';
import { Alert } from '@/src/shared/ui/Alerts/Alert';

import { confirmLinkErrorMessage } from '@/src/features/auth/ui/ConfirmCode/utils/handleConfirmLinkError';
import { clearAppAlert, selectAppAlert } from '@/app/store/appSlice';

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const alert = useAppSelector(selectAppAlert);
  const dispatch = useAppDispatch();

  return (
    <Toast.Provider swipeDirection="right">
      {children}

      {alert && alert.message !== confirmLinkErrorMessage.invalid && (
        <Alert type={alert.type} message={alert.message} onClose={() => dispatch(clearAppAlert())} />
      )}
      <Toast.Viewport className={styles.viewport} />
    </Toast.Provider>
  );
};
