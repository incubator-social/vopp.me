'use client';

import { useAppDispatch, useAppSelector } from '@/app/providers/store/hooks';
import { setCurrentStep, setPreviewURL } from '@/src/features/add-post/slice';
import { Steps } from '@/src/features/add-post/types';
import ArrowBack from '@/src/shared/assets/icons/arrow-ios-back.svg';
import { Button } from '@/src/shared/ui/Button';
import { Modal } from '@/src/shared/ui/Modal';
import Image from 'next/image';
import styles from './CroppingModal.module.scss';

type CroppingModal = {
  handleOpenClose: (open: boolean) => void;
};

const CroppingModal = ({ handleOpenClose }: CroppingModal) => {
  const dispatch = useAppDispatch();
  const isOpenAddPost = useAppSelector((state) => state.sidebar.isOpenAddPost);
  const previewURL = useAppSelector((state) => state.addPost.previewURL);
  const imageSrc = previewURL ? previewURL : '';

  const handleBack = () => {
    if (previewURL) {
      URL.revokeObjectURL(previewURL);
      dispatch(setPreviewURL(null));
    }
    dispatch(setCurrentStep(Steps.UploadImage));
  };

  const handleNext = () => {
    dispatch(setCurrentStep(Steps.Description));
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

  return (
    <Modal
      open={isOpenAddPost}
      onOpenChange={handleOpenClose}
      closeOnEsc={true}
      closeOnOverlayClick={true}
      size={'md'}
      headerContent={headerContent}
      contentClassName={styles.container}
    >
      <div className={styles.containerImage}>
        <Image src={imageSrc} alt="preview uploaded image" className={styles.image} />
      </div>
    </Modal>
  );
};

export default CroppingModal;
