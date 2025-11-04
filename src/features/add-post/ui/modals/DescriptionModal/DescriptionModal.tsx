'use client';

import { useAppDispatch, useAppSelector } from '@/app/providers/store/hooks';
import { setCurrentStep } from '@/src/features/add-post/slice';
import { Steps } from '@/src/features/add-post/types';
import { Textarea } from '@/src/shared/ui/Textarea/Textarea';
import Image from 'next/image';
import styles from './DescriptionModal.module.scss';
import ArrowBack from '@/src/shared/assets/icons/arrow-ios-back.svg';
import { Button } from '@/src/shared/ui/Button';
import { Modal } from '@/src/shared/ui/Modal';

type CroppingModal = {
  handleOpenClose: (open: boolean) => void;
};

const DescriptionModal = ({ handleOpenClose }: CroppingModal) => {
  const dispatch = useAppDispatch();
  const isOpenAddPost = useAppSelector((state) => state.sidebar.isOpenAddPost);
  const previewURL = useAppSelector((state) => state.addPost.previewURL);
  const imageSrc = previewURL ? previewURL : '';

  const handleBack = () => {
    dispatch(setCurrentStep(Steps.Cropping));
  };

  const headerContent = (
    <div className={styles.headerContainer}>
      <Button
        variant={'buttonText'}
        className={styles.headerArrowBack}
        size={{ minWidth: 24, minHeight: 24, padding: 0 }}
        onClick={handleBack}
      >
        <ArrowBack />
      </Button>
      <h1>Publication</h1>
      <Button variant={'buttonText'} className={styles.headerNext} size={{ padding: 0, minWidth: 'auto' }}>
        Publish
      </Button>
    </div>
  );

  return (
    <Modal
      open={isOpenAddPost}
      onOpenChange={handleOpenClose}
      closeOnEsc={true}
      closeOnOverlayClick={true}
      size={'xl'}
      headerContent={headerContent}
      contentClassName={styles.container}
    >
      <div className={styles.content}>
        <div className={styles.containerImage}>
          <Image src={imageSrc} alt="preview uploaded image" className={styles.image} />
        </div>
        <div className={styles.descriptionContainer}>
          <div className={styles.userInfo}>
            <Image src="" style={{ width: '36px', height: '36px', border: '1px solid red' }} alt="profile avatar" />
            <p>UserName</p>
          </div>
          <Textarea
            label={'Add publication descriptions'}
            containerClassName={styles.textariaContainer}
            resize={'none'}
            className={styles.textarea}
            labelClassName={styles.labelTextaria}
            maxLength={500}
          />
        </div>
      </div>
    </Modal>
  );
};

export default DescriptionModal;
