import * as Toast from '@radix-ui/react-toast';
import { useEffect, useRef, useState } from 'react';
import styles from '@/src/shared/ui/Alerts/alert.module.scss';
import CloseIcon from '@/src/shared/assets/icons/close.svg';
import clsx from 'clsx';
import { AlertType } from '../../types/common';

type AlertProps = {
  type: AlertType;
  message: string;
  duration?: number;
  onClose?: () => void;
};

export const Alert = ({ type, message, duration = 10000, onClose }: AlertProps) => {
  const [open, setOpen] = useState(true);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) {
      onCloseRef.current?.();
    }
  }, [open, onClose]);

  return (
    <Toast.Root
      open={open}
      onOpenChange={setOpen}
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
