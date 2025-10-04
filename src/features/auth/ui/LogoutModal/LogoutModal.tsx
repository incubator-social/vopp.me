'use client';

import { Modal } from '@/src/shared/ui/Modal/Modal';
import { Button } from '@/src/shared/ui/Button/Button';
import styles from './LogoutModal.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userEmail: string | undefined;
};

export const LogoutModal = ({ isOpen, onClose, onConfirm, userEmail }: Props) => {
  const message = `Are you really want to log out of your account "${userEmail}"?`;

  return (
    <Modal open={isOpen} onOpenChange={onClose} size="md" closeButtonPosition="inside" bodyClassName={styles.body}>
      <h3 className={styles.message}>{message}</h3>
      <div className={styles.footer}>
        <Button variant="buttonOutline" onClick={onConfirm} size={{ minWidth: 100 }}>
          Yes
        </Button>
        <Button variant="buttonPrimary" onClick={onClose} size={{ minWidth: 100 }}>
          No
        </Button>
      </div>
    </Modal>
  );
};
