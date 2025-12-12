'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';

import { removeImages, setCurrentStep } from '@/src/features/add-post/model';

import { Modal } from '@/src/shared/ui/Modal';
import { Button } from '@/src/shared/ui/Button';
import { ConfirmModal } from '@/src/shared/ui/ConfirmModal';
import ArrowBack from '@/src/shared/assets/icons/arrow-ios-back-outline.svg';

import { closeAddPost, setActiveButton } from '@/src/widgets/sidebar-wrapper/model';

import { Steps } from '../../../model';

import styles from './CroppingModal.module.scss';

type CroppingModal = {
  handleOpenClose: (open: boolean) => void;
};

export const CroppingModal = ({ handleOpenClose }: CroppingModal) => {
  const dispatch = useAppDispatch();
  const isOpenAddPost = useAppSelector((state) => state.sidebar.isOpenAddPost);
  const previousActiveButton = useAppSelector((state) => state.sidebar.previousActiveButton);
  const images = useAppSelector((state) => state.addPost.images);
  const [toConfirm, setToConfirm] = useState<boolean>(false);

  const previewURL = useRef<string>('');
  if (images.length) {
    previewURL.current = images[0].previewURL;
  } else {
    previewURL.current = '';
  }

  const handleBack = () => {
    setToConfirm(true);
  };

  const handleNext = () => {
    dispatch(setCurrentStep(Steps.Description));
  };

  const onConfirmDiscard = () => {
    if (images) {
      for (const image of images) {
        URL.revokeObjectURL(image.previewURL);
      }
      dispatch(removeImages());
    }
    setToConfirm(false);
    dispatch(closeAddPost());
    dispatch(setActiveButton(previousActiveButton));
  };

  const onSaveDraft = () => {
    setToConfirm(false);
    dispatch(closeAddPost());
    dispatch(setActiveButton(previousActiveButton));
  };

  const headerContent = (
    <div className={styles.headerCropping}>
      <Button
        variant={'buttonText'}
        className={styles.croppingArrowBack}
        size={{ minWidth: 24, minHeight: 24, padding: 0 }}
        onClick={handleBack}
      >
        <ArrowBack />
      </Button>
      <h1>Cropping</h1>
      <Button
        variant={'buttonText'}
        className={styles.croppingNext}
        size={{ padding: 0, minWidth: 'auto' }}
        onClick={handleNext}
      >
        Next
      </Button>
    </div>
  );

  const confirmMessage = (
    <p>
      Do you really want to close the creation of a publication? <br />
      If you close everything will be deleted
    </p>
  );

  return (
    <>
      <Modal
        open={isOpenAddPost}
        onOpenChange={handleOpenClose}
        size={'md'}
        headerContent={headerContent}
        contentClassName={styles.container}
        noPadding={true}
        setToConfirm={setToConfirm}
      >
        <div className={styles.containerImage}>
          {images && (
            <Image
              src={previewURL.current}
              alt="preview uploaded image"
              className={styles.image}
              width={490}
              height={504}
            />
          )}
        </div>
      </Modal>
      {toConfirm && (
        <ConfirmModal
          open={toConfirm}
          title={'Close'}
          message={confirmMessage}
          confirmText={'Discard'}
          cancelText={'Save Draft'}
          classFooter={styles.confirmModalButtons}
          onConfirm={onConfirmDiscard}
          onCancel={() => setToConfirm(false)}
          onCancelCustom={onSaveDraft}
          modalSize={'sm'}
          closeOnOverlayClick={true}
          closeOnEsc={true}
        />
      )}
    </>
  );
};
