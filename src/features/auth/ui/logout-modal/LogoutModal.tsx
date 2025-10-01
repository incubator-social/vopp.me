'use client';

import { Button } from '@/src/shared/ui/Button/Button';
import { useEffect } from 'react';
import styles from './LogoutModal.module.scss';
import CloseIcon from '@/src/shared/assets/icons/close.svg';
import { Dialog } from '@radix-ui/react-dialog';

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userEmail?: string;
}

export const LogoutModal = ({ isOpen, onClose, onConfirm, userEmail }: LogoutConfirmModalProps) => {
  // Обработка закрытия по клавише Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Блокировка прокрутки основного контента
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Закрытие по клику на оверлей
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.content}>
        <h3 className={styles.title}>Are you really want to log out of your account `${userEmail}`</h3>
        <div className={styles.buttonsActionContainer}>
          <Button onClick={onConfirm} variant="buttonPrimary">
            Yes
          </Button>
          <Button onClick={onClose} variant="buttonText">
            No
          </Button>
        </div>
        <div>
          <Dialog>
            <button className={styles.closeButton} type="button" onClick={onClose}>
              <CloseIcon className={styles.closeIcon} />
            </button>
          </Dialog>
        </div>
      </div>
    </div>
  );
};
