'use client';

import { useAppDispatch, useAppSelector } from '@/app/providers/store/hooks';
import { useHandleFileChange } from '@/src/features/add-post/lib';
import { setCurrentStep } from '@/src/features/add-post/slice';
import { Steps } from '@/src/features/add-post/types';
import { AlertModal } from '@/src/shared/ui/AlertModal';
import { Button } from '@/src/shared/ui/Button';
import { Modal } from '@/src/shared/ui/Modal';
import { useEffect, useState } from 'react';
import ImageIcon from '@/src/shared/assets/icons/image-outline.svg';
import styles from './UploadModal.module.scss';

type UploadModal = {
  handleOpenCloseModal: (open: boolean) => void;
};

const UploadModal = ({ handleOpenCloseModal }: UploadModal) => {
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
  }, [images, dispatch]);

  const handleOpenClose = (open: boolean) => {
    handleOpenCloseModal(open);
    dispatch(setCurrentStep(Steps.UploadImage));
  };

  const openDraft = () => {
    if (images.length) dispatch(setCurrentStep(Steps.Cropping));
  };

  return (
    <>
      <Modal
        open={isOpenAddPost}
        onOpenChange={handleOpenClose}
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
            <Button variant={'buttonOutline'} size={{ width: '100%' }} onClick={openDraft}>
              Open Draft
            </Button>
          </div>
        </div>
      </Modal>
      {uploadError && (
        <AlertModal
          open={uploadError}
          onOpenChange={() => setUploadError(false)}
          message={'The photo must be less than 20 Mb and have JPEG or PNG format'}
        />
      )}
    </>
  );
};

export default UploadModal;
