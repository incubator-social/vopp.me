import * as Toast from '@radix-ui/react-toast';
import { useState } from 'react';
import styles from '@/src/shared/ui/Alerts/alert.module.scss';
import CloseIcon from '@/src/shared/assets/icons/close.svg';
import clsx from 'clsx';

type ToastItemProps = {
  type: 'success' | 'error';
  message: string;
  duration?: number; // в миллисекундах, можно Infinity
  onClose?: () => void;
};

export const Alert = ({ type, message, duration = 10000, onClose }: ToastItemProps) => {
  const [open, setOpen] = useState(true);

  return (
    <Toast.Root
      open={open}
      onOpenChange={(state) => {
        setOpen(state);
        if (!state) onClose?.();
      }}
      duration={duration}
      className={clsx('regular-text-16', styles.alert, styles[`alert--${type}`])}
    >
      {message}
      <Toast.Close className={styles.close}>
        <CloseIcon />
      </Toast.Close>
    </Toast.Root>
  );
};
