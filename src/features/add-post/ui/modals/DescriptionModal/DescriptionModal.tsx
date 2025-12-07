'use client';

import { useAppDispatch, useAppSelector } from '@/app/providers/store/hooks';
import { AddPostDescriptionValue, addPostSchema } from '@/src/features/add-post/modal';
import { removeImages, setCurrentStep } from '@/src/features/add-post/slice';
import { Steps } from '@/src/features/add-post/types';
import { useOnSubmit } from '@/src/features/add-post/ui/modals/DescriptionModal/lib';
import { useGetUserProfileQuery } from '@/src/features/auth/api';
import { useAuth } from '@/src/features/auth/lib/useAuth';
import { closeAddPost, setActiveButton, setPreviousActiveButton } from '@/src/features/sidebar-wrapper/store';
import ArrowBack from '@/src/shared/assets/icons/arrow-ios-back-outline.svg';
import { ROUTES } from '@/src/shared/config/routes';
import { getUserFromToken } from '@/src/shared/lib/auth';
import { Avatar } from '@/src/shared/ui/Avatar';
import { Button } from '@/src/shared/ui/Button';
import { ConfirmModal } from '@/src/shared/ui/ConfirmModal';
import { Modal } from '@/src/shared/ui/Modal';
import { Textarea } from '@/src/shared/ui/Textarea/Textarea';
import { OptionId } from '@/src/widgets/Sidebar/data';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './DescriptionModal.module.scss';

type CroppingModal = {
  handleOpenClose: (open: boolean) => void;
};

const DescriptionModal = ({ handleOpenClose }: CroppingModal) => {
  const dispatch = useAppDispatch();
  const isOpenAddPost = useAppSelector((state) => state.sidebar.isOpenAddPost);
  const imagesState = useAppSelector((state) => state.addPost.images);
  const previousActiveButton = useAppSelector((state) => state.sidebar.previousActiveButton);

  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  const [nameUser, setNameUser] = useState<string | undefined>('User Name');

  const router = useRouter();
  const [onPostSubmit, isLoadingPostImage, isLoadingPostPost] = useOnSubmit();
  const [toConfirm, setToConfirm] = useState<boolean>(false);

  const { user } = useAuth();
  const { data, isSuccess } = useGetUserProfileQuery(user?.userId as number);

  useEffect(() => {
    if (isSuccess) {
      setNameUser(data.userName);
      if (data.avatars[0]?.url) {
        setAvatarUrl(data.avatars[0]?.url);
      }
    }
  }, [data, isSuccess]);

  const previewURL = useRef<string>('');
  if (imagesState) {
    previewURL.current = imagesState[0].previewURL;
  } else {
    previewURL.current = '';
  }

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

  const onConfirmDiscard = () => {
    if (imagesState) {
      for (const image of imagesState) {
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
    const user = getUserFromToken();
    if (user) {
      router.replace(ROUTES.PROFILE_BY_ID(user.userId));
    }
    dispatch(setActiveButton(OptionId.MyProfile));
    dispatch(setPreviousActiveButton(OptionId.MyProfile));
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
        disabled={isSubmitting || isLoadingPostImage || isLoadingPostPost}
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
        contentClassName={styles.container}
        noPadding={true}
        setToConfirm={setToConfirm}
      >
        <form id={'post-publication-form'} onSubmit={onSubmit}>
          <div className={styles.content}>
            <div className={styles.containerImage}>
              {imagesState && (
                <Image
                  src={previewURL.current}
                  width={490}
                  height={504}
                  alt="preview uploaded image"
                  className={styles.image}
                />
              )}
            </div>
            <div className={styles.descriptionContainer}>
              <div className={styles.userInfo}>
                <Avatar src={avatarUrl} />
                <p>{nameUser}</p>
              </div>

              <Textarea
                label={'Add publication descriptions'}
                resize={'none'}
                className={styles.textarea}
                labelClassName={styles.labelTextAria}
                maxLength={500}
                {...register('description')}
              />

              <span className={`${styles.captionLength} regular-text-14`}>
                {descriptionText}/{500}
              </span>

              {errors.description && <span>{errors.description.message}</span>}
            </div>
          </div>
        </form>
      </Modal>
      {toConfirm && (
        <ConfirmModal
          open={toConfirm}
          title={'Close'}
          message={confirmMessage}
          confirmText={'Discard'}
          cancelText={'Save Draft'}
          classFooter={styles.confirmModalButtons}
          // onConfirm={onConfirmDiscard}
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

export default DescriptionModal;
