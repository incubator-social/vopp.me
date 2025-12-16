'use client';

import { onConfirmDiscard } from '@/src/features/add-post/ui/modals/description-modal/lib/onConfirmDiscard';
import { DescriptionForm } from '@/src/features/add-post/ui/modals/description-modal/ui/description-form';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';

import { Modal } from '@/src/shared/ui/Modal';
import { Button } from '@/src/shared/ui/Button';
import { ROUTES } from '@/src/shared/config/routes';
import { getUserFromToken } from '@/src/shared/lib/auth';
import { ConfirmModal } from '@/src/shared/ui/ConfirmModal';
import ArrowBack from '@/src/shared/assets/icons/arrow-ios-back-outline.svg';

import { OptionId } from '@/src/widgets/sidebar/config';
import { closeAddPost, setActiveButton, setPreviousActiveButton } from '@/src/widgets/sidebar-wrapper/model';

import { AddPostDescriptionValue, addPostSchema, setCurrentStep } from '../../../../../model';
import { Steps } from '../../../../../model';

import { useOnSubmit } from '../../lib';

import styles from './DescriptionModal.module.scss';

type CroppingModal = {
  handleOpenClose: (open: boolean) => void;
};

export const DescriptionModal = ({ handleOpenClose }: CroppingModal) => {
  const dispatch = useAppDispatch();
  const { isOpenAddPost, previousActiveButton } = useAppSelector((state) => state.sidebar);
  const imagesState = useAppSelector((state) => state.addPost.images);

  const [onPostSubmit, isLoadingPostImage, isLoadingCreatePost] = useOnSubmit();

  const router = useRouter();

  const [toConfirm, setToConfirm] = useState<boolean>(false);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<AddPostDescriptionValue>({
    resolver: zodResolver(addPostSchema),
    mode: 'onSubmit'
  });

  const onSubmit = handleSubmit((data) => {
    const description = data.description;
    onPostSubmit({ description, imagesState, handleOpenClose });
  });

  const descriptionText = watch('description')?.length ? watch('description')?.length : 0;

  const handleBack = () => {
    dispatch(setCurrentStep(Steps.Cropping));
  };

  const onConfirmModal = () => {
    return onConfirmDiscard({ dispatch, imagesState, setToConfirm, previousActiveButton });
  };

  const onSaveDraft = () => {
    setToConfirm(false);
    dispatch(closeAddPost());
    const user = getUserFromToken();
    if (user) {
      router.replace(ROUTES.PROFILE_BY_ID(user.userId));
    }
    dispatch(setActiveButton(OptionId.myProfile));
    dispatch(setPreviousActiveButton(OptionId.myProfile));
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
        disabled={isSubmitting || isLoadingPostImage || isLoadingCreatePost}
        form={'post-publication-form'}
      >
        Publish
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
        size={'xl'}
        headerContent={headerContent}
        contentClassName={styles.modalContent}
        noPadding={true}
        setToConfirm={setToConfirm}
      >
        <DescriptionForm
          register={register}
          formHandleSubmit={onSubmit}
          descriptionText={descriptionText}
          errors={errors}
        />
      </Modal>
      {toConfirm && (
        <ConfirmModal
          open={toConfirm}
          title={'Close'}
          message={confirmMessage}
          confirmText={'Discard'}
          cancelText={'Save Draft'}
          classFooter={styles.confirmModalButtons}
          onConfirm={onConfirmModal}
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
