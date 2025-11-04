'use client';

import { useAppSelector } from '@/app/providers/store/hooks';
import { Button } from '@/src/shared/ui/Button';
import { Modal } from '@/src/shared/ui/Modal';
import { ChangeEvent } from 'react';
import ImageIcon from '@/src/shared/assets/icons/image-outline.svg';
import styles from './UploadModal.module.scss';

type UploadModal = {
  handleOpenClose: (open: boolean) => void;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const UploadModal = ({ handleOpenClose, handleFileChange }: UploadModal) => {
  const isOpenAddPost = useAppSelector((state) => state.sidebar.isOpenAddPost);
  const draftImage = '';

  return (
    <Modal
      open={isOpenAddPost}
      onOpenChange={handleOpenClose}
      closeOnEsc={true}
      closeOnOverlayClick={true}
      title={'Add Photo'}
      size={'md'}
    >
      <div className={styles.content}>
        <div className={styles.rectangle}>
          <ImageIcon width={48} height={48} />
        </div>
        <div className={styles.buttonsGroup}>
          <Button className={styles.buttonSelectImage}>
            <label htmlFor="input-image" className={styles.inputImageLabel}>
              Select from Computer
            </label>
            <input
              type="file"
              id={'input-image'}
              accept={'image/*'}
              className={styles.inputImage}
              onChange={handleFileChange}
            />
          </Button>
          {draftImage && (
            <Button variant={'buttonOutline'} size={{ width: '100%' }}>
              Open Draft
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default UploadModal;
