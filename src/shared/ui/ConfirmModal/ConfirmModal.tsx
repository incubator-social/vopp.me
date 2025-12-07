'use client';

import { Modal } from '@/src/shared/ui/Modal/Modal';
import { Button } from '@/src/shared/ui/Button/Button';
import { clsx } from 'clsx';
import { ReactNode } from 'react';
import styles from './ConfirmModal.module.scss';

type ConfirmModalProps = {
  open: boolean;
  title?: string;
  message: string | ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
  modalSize?: 'sm' | 'md' | 'lg' | 'xl';
  classFooter?: string;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  onCancelCustom?: () => void;
};

export const ConfirmModal = ({
  open,
  title,
  message,
  confirmText = 'Yes',
  cancelText = 'No',
  onConfirm,
  onCancel,
  loading,
  modalSize = 'md',
  classFooter,
  closeOnOverlayClick,
  closeOnEsc,
  onCancelCustom
}: ConfirmModalProps) => {
  const sizeButton = { minWidth: 96, height: 36 };
  return (
    <Modal
      open={open}
      onOpenChange={loading ? undefined : onCancel}
      closeOnOverlayClick={closeOnOverlayClick}
      closeOnEsc={closeOnEsc}
      title={title}
      size={modalSize}
      closeButtonPosition="inside"
      bodyClassName={styles.body}
    >
      <div className={styles.message}>{message}</div>
      <div className={clsx(styles.footer, classFooter)}>
        <Button variant="buttonOutline" onClick={onConfirm} size={sizeButton}>
          {confirmText}
        </Button>
        <Button variant="buttonPrimary" onClick={onCancelCustom ? onCancelCustom : onCancel} size={sizeButton}>
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
