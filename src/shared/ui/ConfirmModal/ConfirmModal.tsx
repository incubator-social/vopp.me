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
  loading?: boolean;
};

export const ConfirmModal = ({
  open,
  title,
  message,
  confirmText = 'Yes',
  cancelText = 'No',
  onConfirm,
  onCancel,
  loading
}: ConfirmModalProps) => {
  const sizeButton = { minWidth: 96, height: 36 };
  return (
    <Modal
      open={open}
      onOpenChange={loading ? undefined : onCancel}
      title={title}
      size="md"
      closeButtonPosition="inside"
      bodyClassName={`${styles.body}`}
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
      {loading && (
        <div className={styles.overlay}>
          <div className={styles.loader} />
        </div>
      )}
    </Modal>
  );
};
