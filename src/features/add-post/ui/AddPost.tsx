'use client';

import { useAppDispatch, useAppSelector } from '@/app/providers/store/hooks';
import { Steps } from '@/src/features/add-post/types';
import { closeAddPost, openAddPost, setActiveButton } from '@/src/features/sidebar-wrapper/store/sidebarSlice';
import CroppingModal from '@/src/features/add-post/ui/modals/CroppingModal/CroppingModal';
import DescriptionModal from '@/src/features/add-post/ui/modals/DescriptionModal/DescriptionModal';
import UploadModal from '@/src/features/add-post/ui/modals/UploadModal/UploadModal';

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
