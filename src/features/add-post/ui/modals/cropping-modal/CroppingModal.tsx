'use client';

import { PreviewImageAspect } from '../../preview-image-aspect/PreviewImageAspect';
import { CroppingFooterMenu } from './cropping-footer-menu/CroppingFooterMenu';
import { ImageCropper } from './image-cropper/ImageCropper';

import { CroppingConfirmModalHeader } from './cropping-confirm-modal-header/CroppingConfirmModalHeader';
import { useRef, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';

import { removeImages, setCurrentStep } from '@/src/features/add-post/model';

import { Modal } from '@/src/shared/ui/Modal';
import { ConfirmModal } from '@/src/shared/ui/ConfirmModal';

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

  const [imageCropper, setImageCropper] = useState<boolean>(false);

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
        {images &&
          images.map((image) => (
            <div key={image.id} className={styles.containerImage}>
              <PreviewImageAspect aspect={image.crop.aspect} previewUrl={image.previewURL} />
              {imageCropper && <ImageCropper imageUrl={previewURL.current} id={image.id} aspect={image.crop.aspect} />}
              <CroppingFooterMenu
                imageId={image.id}
                setImageCropper={() => setImageCropper((prevState) => !prevState)}
              />
            </div>
          ))}
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
