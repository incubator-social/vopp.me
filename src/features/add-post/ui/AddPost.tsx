'use client';

import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';

import { Steps } from '../model';
import { UploadModal } from './modals';
import { CroppingModal } from './modals';
import { DescriptionModal } from './modals/';

import { openAddPost, closeAddPost, setActiveButton } from '@/src/widgets/sidebar-wrapper/model';

export const AddPost = () => {
  const dispatch = useAppDispatch();
  const { isOpenAddPost, previousActiveButton } = useAppSelector((state) => state.sidebar);
  const currentStep = useAppSelector((state) => state.addPost.currentStep);

  const handleOpenCloseModal = (open: boolean) => {
    if (open) {
      dispatch(openAddPost());
    } else {
      dispatch(closeAddPost());
      dispatch(setActiveButton(previousActiveButton));
    }
  };

  const modals = {
    [Steps.UploadImage]: <UploadModal handleOpenClose={handleOpenCloseModal} />,
    [Steps.Cropping]: <CroppingModal handleOpenClose={handleOpenCloseModal} />,
    [Steps.Description]: <DescriptionModal handleOpenClose={handleOpenCloseModal} />
  };

  if (!isOpenAddPost || !currentStep) return null;

  return modals[currentStep];
};
