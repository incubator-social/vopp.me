'use client';

import { useAppDispatch, useAppSelector } from '@/app/providers/store/hooks';
import { usePostImageMutation } from '@/src/features/add-post/api';
import { AddPostDescription, addPostSchema } from '@/src/features/add-post/modal';
import { setCurrentStep } from '@/src/features/add-post/slice';
import { Steps } from '@/src/features/add-post/types';
import { Textarea } from '@/src/shared/ui/Textarea/Textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import styles from './DescriptionModal.module.scss';
import ArrowBack from '@/src/shared/assets/icons/arrow-ios-back.svg';
import { Button } from '@/src/shared/ui/Button';
import { Modal } from '@/src/shared/ui/Modal';
import ava from '@/public/ava.jpg';

type CroppingModal = {
  handleOpenClose: (open: boolean) => void;
};

const DescriptionModal = ({ handleOpenClose }: CroppingModal) => {
  const dispatch = useAppDispatch();
  const isOpenAddPost = useAppSelector((state) => state.sidebar.isOpenAddPost);
  const images = useAppSelector((state) => state.addPost.images);

  let previewURL;
  if (images) {
    previewURL = images[0].previewURL;
  }

  const handleBack = () => {
    dispatch(setCurrentStep(Steps.Cropping));
  };

  // const [postImages, { data }] = usePostImageMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<AddPostDescription>({
    resolver: zodResolver(addPostSchema),
    mode: 'onSubmit'
  });
  const onSubmit = () =>
    // { description }: AddPostDescription
    {
      // if (images) postImages(images);
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
      <Button
        variant={'buttonText'}
        className={styles.headerNext}
        size={{ padding: 0, minWidth: 'auto' }}
        type={'submit'}
        disabled={isSubmitting}
        form={'post-publication-form'}
      >
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
      <form id={'post-publication-form'} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.content}>
          <div className={styles.containerImage}>
            {previewURL && (
              <Image src={previewURL} width={490} height={504} alt="preview uploaded image" className={styles.image} />
            )}
          </div>
          <div className={styles.descriptionContainer}>
            <div className={styles.userInfo}>
              <Image
                src={ava}
                style={{ width: '36px', height: '36px', border: '1px solid red' }}
                alt="profile avatar"
              />
              <p>UserName</p>
            </div>
            <Textarea
              label={'Add publication descriptions'}
              containerClassName={styles.textariaContainer}
              resize={'none'}
              cols={30}
              className={styles.textarea}
              labelClassName={styles.labelTextaria}
              maxLength={500}
              {...register('description')}
            />
            <span className={styles.captionLength}>0 / 500</span>
            {errors.description && <span>{errors.description.message}</span>}
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default DescriptionModal;
