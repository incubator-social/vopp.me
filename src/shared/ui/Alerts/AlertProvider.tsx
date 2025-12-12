'use client';

import * as Toast from '@radix-ui/react-toast';
import { ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';
import { selectAppAlert, clearAppAlert } from '@/app/model/appSlice';
import { Alert } from '@/src/shared/ui/Alerts/Alert';
import styles from '@/src/shared/ui/Alerts/alert.module.scss';

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const alert = useAppSelector(selectAppAlert);
  const dispatch = useAppDispatch();

  return (
    <Toast.Provider swipeDirection="right">
      {children}

      {alert && (
        <Alert type={alert.type} message={alert.message} duration={8000} onClose={() => dispatch(clearAppAlert())} />
      )}

      <Toast.Viewport className={styles.viewport} />
    </Toast.Provider>
  );
};
