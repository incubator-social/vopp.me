'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';

import { Modal } from '@/src/shared/ui/Modal';
import { ROUTES } from '@/src/shared/config/routes';
import { getUserFromToken } from '@/src/shared/lib/auth';
import { ConfirmModal } from '@/src/shared/ui/ConfirmModal';

import { OptionId } from '@/src/widgets/sidebar/config';
import { closeAddPost, setActiveButton, setPreviousActiveButton } from '@/src/widgets/sidebar-wrapper/model';

import { AddPostDescriptionValue, addPostSchema } from '../../../model';

import { useOnSubmit } from './useOnSubmit';
import { onConfirmDiscard } from './onConfirmDiscard';
import { DescriptionForm } from './description-form/DescriptionForm';
import { DescriptionConfirmModalHeader } from './description-confirm-modal-header/DescriptionConfirmModalHeader';

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

  const descriptionConfirmMessage = (
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
        headerContent={
          <DescriptionConfirmModalHeader
            isSubmitting={isSubmitting}
            isLoadingPostImage={isLoadingPostImage}
            isLoadingCreatePost={isLoadingCreatePost}
          />
        }
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
          message={descriptionConfirmMessage}
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
