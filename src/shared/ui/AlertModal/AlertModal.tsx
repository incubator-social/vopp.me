'use client';

import { ReactNode } from 'react';
import { Modal } from '../Modal';
import { Button } from '../Button/Button';
import styles from './AlertModal.module.scss';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  message: ReactNode;
  confirmText?: string;
  onConfirm?: () => void;
};
export const AlertModal = ({ open, onOpenChange, title, message, confirmText = 'OK', onConfirm }: Props) => {
  const handleConfirm = () => {
    onConfirm?.();
    onOpenChange(false);
  };

  const sizeButton = { minWidth: 96, height: 36 };

  return (
    <Modal open={open} onOpenChange={onOpenChange} size="sm" title={title} bodyClassName={styles.body}>
      <div className={styles.message}>{message}</div>
      <div className={styles.footer}>
        <Button onClick={handleConfirm} size={sizeButton}>
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
};
