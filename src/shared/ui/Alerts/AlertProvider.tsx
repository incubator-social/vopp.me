'use client';

import * as Toast from '@radix-ui/react-toast';
import { ReactNode } from 'react';
import styles from '@/src/shared/ui/Alerts/alert.module.scss';

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Toast.Provider swipeDirection="right">
      {children}
      <Toast.Viewport className={styles.viewport} />
    </Toast.Provider>
  );
};
