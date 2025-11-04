'use client';

import { setCurrentStep, setPreviewURL } from '@/src/features/add-post/slice';
import { Steps } from '@/src/features/add-post/types';
import CroppingModal from '@/src/features/add-post/ui/modals/CroppingModal/CroppingModal';
import DescriptionModal from '@/src/features/add-post/ui/modals/DescriptionModal/DescriptionModal';
import UploadModal from '@/src/features/add-post/ui/modals/UploadModal/UploadModal';
import { ChangeEvent, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/providers/store/hooks';
import { closeAddPost, openAddPost, setActiveButton } from '@/src/features/sidebar-wrapper/store/sidebarSlice';

const AddPost = () => {
  const dispatch = useAppDispatch();
  const isOpenAddPost = useAppSelector((state) => state.sidebar.isOpenAddPost);
  const previousActiveButton = useAppSelector((state) => state.sidebar.previousActiveButton);

  const previewURL = useAppSelector((state) => state.addPost.previewURL);
  const currentStep = useAppSelector((state) => state.addPost.currentStep);

  const imagesRef = useRef<File[] | null>(null);

  useEffect(() => {
    return () => {
      if (previewURL) URL.revokeObjectURL(previewURL);
    };
  }, [previewURL]);

  if (!previewURL) imagesRef.current = null;

  const handleOpenCloseAddPost = (open: boolean) => {
    if (open) {
      dispatch(openAddPost());
      dispatch(setCurrentStep(Steps.UploadImage));
    } else {
      if (previewURL) {
        URL.revokeObjectURL(previewURL);
        dispatch(setPreviewURL(null));
      }
      dispatch(closeAddPost());
      dispatch(setActiveButton(previousActiveButton));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    imagesRef.current ??= [];
    imagesRef.current.push(file);

    const url = URL.createObjectURL(file);
    dispatch(setPreviewURL(url));
    dispatch(setCurrentStep(Steps.Cropping));
  };

  return (
    isOpenAddPost && (
      <>
        {(() => {
          switch (currentStep) {
            case Steps.UploadImage:
              return <UploadModal handleOpenClose={handleOpenCloseAddPost} handleFileChange={handleFileChange} />;
            case Steps.Cropping:
              return <CroppingModal handleOpenClose={handleOpenCloseAddPost} />;
            case Steps.Description:
              return <DescriptionModal handleOpenClose={handleOpenCloseAddPost} />;
            default:
              return null;
          }
        })()}
      </>
    )
  );
};

export default AddPost;
