'use client';

import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';

import { Modal } from '@/src/shared/ui/Modal';
import { Button } from '@/src/shared/ui/Button';
import { AlertModal } from '@/src/shared/ui/AlertModal';
import ImageIcon from '@/src/shared/assets/icons/image-outline.svg';

import { Steps } from '../../../model/types';
import { setCurrentStep } from '../../../model';
import { useHandleFileChange } from '../../../model';

import styles from './UploadModal.module.scss';

type UploadModal = {
  handleOpenClose: (open: boolean) => void;
};

export const UploadModal = ({ handleOpenClose }: UploadModal) => {
  const dispatch = useAppDispatch();
  const isOpenAddPost = useAppSelector((state) => state.sidebar.isOpenAddPost);
  const images = useAppSelector((state) => state.addPost.images);

  const [uploadError, setUploadError] = useState<boolean>(false);

  const handleFileChange = useHandleFileChange({ setUploadError });

  // удаляем объект URL, только когда страница приложения закрывается или перезагружается, чтобы избежать утечки
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (images) {
        for (const image of images) {
          URL.revokeObjectURL(image.previewURL);
        }
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [images]);

  const handleOpenCloseModal = (open: boolean) => {
    handleOpenClose(open);
  };

  const openDraft = () => {
    if (images.length) dispatch(setCurrentStep(Steps.Cropping));
  };

  return (
    <>
      <Modal
        open={isOpenAddPost}
        onOpenChange={handleOpenCloseModal}
        closeOnEsc={true}
        closeOnOverlayClick={true}
        title={'Add Photo'}
        size={'md'}
        noPadding={true}
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
            <Button
              variant={'buttonOutline'}
              size={{ width: '100%' }}
              onClick={openDraft}
              disabled={images.length === 0}
            >
              Open Draft
            </Button>
          </div>
        </div>
      </Modal>
      {uploadError && (
        <AlertModal
          open={uploadError}
          onOpenChange={(close: boolean) => setUploadError(close)}
          message={'The photo must be less than 20 Mb and have JPEG or PNG format'}
        />
      )}
    </>
  );
};
