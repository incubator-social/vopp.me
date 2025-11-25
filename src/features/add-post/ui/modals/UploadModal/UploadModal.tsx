'use client';

import { useAppDispatch, useAppSelector } from '@/app/providers/store/hooks';
import { addImage, setCurrentStep } from '@/src/features/add-post/slice';
import { Steps } from '@/src/features/add-post/types';
import { Button } from '@/src/shared/ui/Button';
import { Modal } from '@/src/shared/ui/Modal';
import { ChangeEvent, useEffect } from 'react';
import ImageIcon from '@/src/shared/assets/icons/image-outline.svg';
import styles from './UploadModal.module.scss';

type UploadModal = {
  handleOpenCloseModal: (open: boolean) => void;
};

const UploadModal = ({ handleOpenCloseModal }: UploadModal) => {
  const dispatch = useAppDispatch();
  const isOpenAddPost = useAppSelector((state) => state.sidebar.isOpenAddPost);
  const images = useAppSelector((state) => state.addPost.images);

  useEffect(() => {
    // удаляем объект URL, только когда страница приложения закрывается или перезагружается, чтобы избежать утечки
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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file, index) => {
      const previewURL = URL.createObjectURL(file);
      const newImage = {
        id: index,
        file,
        previewURL,
        filters: {}
      };
      dispatch(addImage(newImage));
    });
    dispatch(setCurrentStep(Steps.Cropping));
  };

  const handleOpenClose = (open: boolean) => {
    handleOpenCloseModal(open);
    dispatch(setCurrentStep(Steps.UploadImage));
  };

  const openDraft = () => {
    dispatch(setCurrentStep(Steps.Cropping));
  };

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
          {!!images.length && (
            <Button variant={'buttonOutline'} size={{ width: '100%' }} onClick={openDraft}>
              Open Draft
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default UploadModal;
