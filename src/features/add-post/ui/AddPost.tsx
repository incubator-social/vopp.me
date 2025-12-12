'use client';

import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';

import { Steps } from '../model';
import { UploadModal } from '../ui/modals/upload-modal';
import { CroppingModal } from '../ui/modals/cropping-modal';
import { DescriptionModal } from '../ui/modals/description-modal';

import { openAddPost, closeAddPost, setActiveButton } from '@/src/widgets/sidebar-wrapper/model';

const AddPost = () => {
  const dispatch = useAppDispatch();
  const isOpenAddPost = useAppSelector((state) => state.sidebar.isOpenAddPost);
  const currentStep = useAppSelector((state) => state.addPost.currentStep);
  const previousActiveButton = useAppSelector((state) => state.sidebar.previousActiveButton);

  const handleOpenCloseModal = (open: boolean) => {
    if (open) {
      dispatch(openAddPost());
    } else {
      dispatch(closeAddPost());
      dispatch(setActiveButton(previousActiveButton));
    }
  };

  return (
    isOpenAddPost && (
      <>
        {(() => {
          switch (currentStep) {
            case Steps.UploadImage:
              return <UploadModal handleOpenCloseModal={handleOpenCloseModal} />;
            case Steps.Cropping:
              return <CroppingModal handleOpenClose={handleOpenCloseModal} />;
            case Steps.Description:
              return <DescriptionModal handleOpenClose={handleOpenCloseModal} />;
            default:
              return null;
          }
        })()}
      </>
    )
  );
};

export default AddPost;
