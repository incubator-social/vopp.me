'use client';

import { CroppingFooterMenu } from '../footer-menu/ui/footer-menu-main';
import { ImageCropper } from '@/src/features/add-post/ui/modals/cropping-modal/ui/image-cropper';

import { CroppingConfirmModalHeader } from '../cropping-confirm-modal-header/CroppingConfirmModalHeader';
import Image from 'next/image';
import { useRef, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';

import { removeImages } from '@/src/features/add-post/model';

import { Modal } from '@/src/shared/ui/Modal';
import { ConfirmModal } from '@/src/shared/ui/ConfirmModal';

import { closeAddPost, setActiveButton } from '@/src/widgets/sidebar-wrapper/model';

import { Steps } from '../../../../../model';

import styles from './CroppingModal.module.scss';

type CroppingModal = {
  handleOpenClose: (open: boolean) => void;
};

export const CroppingModal = ({ handleOpenClose }: CroppingModal) => {
  const dispatch = useAppDispatch();
  const isOpenAddPost = useAppSelector((state) => state.sidebar.isOpenAddPost);
  const previousActiveButton = useAppSelector((state) => state.sidebar.previousActiveButton);
  const images = useAppSelector((state) => state.addPost.images);

  // const [imageCropper, setImageCropper] = useState<boolean>(false);
  const imageCropper = false;

  const [toConfirm, setToConfirm] = useState<boolean>(false);

  const previewURL = useRef<string>('');
  if (images.length) {
    previewURL.current = images[0].previewURL;
  } else {
    previewURL.current = '';
  }

  const onConfirmDiscard = () => {
    if (images) {
      for (const image of images) {
        URL.revokeObjectURL(image.previewURL);
      }
      dispatch(removeImages());
    }
    setToConfirm(false);
    dispatch(setCurrentStep(Steps.UploadImage));
    dispatch(setActiveButton(previousActiveButton));
  };

  const onSaveDraft = () => {
    setToConfirm(false);
    dispatch(closeAddPost());
    dispatch(setActiveButton(previousActiveButton));
  };

  const croppingConfirmMessage = (
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
        headerContent={<CroppingConfirmModalHeader setToConfirm={setToConfirm} />}
        contentClassName={styles.container}
        noPadding={true}
        setToConfirm={setToConfirm}
      >
        <div className={styles.containerImage}>
          {images && (
            <>
              {imageCropper ? (
                <ImageCropper imageUrl={previewURL.current} />
              ) : (
                <Image
                  src={previewURL.current}
                  alt="preview uploaded image"
                  className={styles.image}
                  width={490}
                  height={504}
                />
              )}
            </>
          )}
          <CroppingFooterMenu
          // setImageCropper={setImageCropper}
          />
        </div>
      </Modal>
      {toConfirm && (
        <ConfirmModal
          open={toConfirm}
          title={'Close'}
          message={croppingConfirmMessage}
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
