'use client';

import { Modal } from '@/src/shared/ui/Modal/Modal';
import { Button } from '@/src/shared/ui/Button/Button';
import styles from './ConfirmModal.module.scss';

type ConfirmModalProps = {
  open: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmModal = ({
  open,
  title,
  message,
  confirmText = 'Yes',
  cancelText = 'No',
  onConfirm,
  onCancel
}: ConfirmModalProps) => {
  const sizeButton = { minWidth: 96, height: 36 };
  return (
    <Modal
      open={open}
      onOpenChange={onCancel}
      title={title}
      size="md"
      closeButtonPosition="inside"
      bodyClassName={styles.body}
    >
      <div className={styles.message}>{message}</div>
      <div className={styles.footer}>
        <Button variant="buttonOutline" onClick={onConfirm} size={sizeButton}>
          {confirmText}
        </Button>
        <Button variant="buttonPrimary" onClick={onCancel} size={sizeButton}>
          {cancelText}
        </Button>
      </div>
    </Modal>
  );
};
