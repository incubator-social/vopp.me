import { ChangeEvent, useId } from 'react';

import { useAppDispatch } from '@/app/lib/hooks';

import { addImage, setCurrentStep } from '@/src/features/add-post/model/addPostSlice';

import { Steps } from './types';

type HandleFileChange = {
  setUploadError: (isError: boolean) => void;
};

export const useHandleFileChange = ({ setUploadError }: HandleFileChange) => {
  const dispatch = useAppDispatch();
  const id = useId();
  let imageError = false;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const MAX_SIZE_20MB = 20 * 1024 * 1024;

    Array.from(files).forEach((file, index) => {
      if (!['image/jpeg', 'image/png'].includes(file.type) || file.size > MAX_SIZE_20MB) {
        setUploadError(true);
        e.target.value = '';
        imageError = true;
      }
      if (imageError) return;
      const previewURL = URL.createObjectURL(file);
      const newImage = {
        id: `${id}-${index}`,
        file,
        previewURL,
        filters: {}
      };
      dispatch(addImage(newImage));
    });

    if (!imageError) dispatch(setCurrentStep(Steps.Cropping));
  };
  return handleFileChange;
};
