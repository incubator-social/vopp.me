import { usePostImageMutation, useCreatePostMutation } from '@/src/entities/post/api/postsApi';

import { ImageDataType } from '../../../model';
import { getCroppedImage } from '../cropping-modal/getCroppedImage';

type OnSubmitArgs = {
  description: string;
  imagesState: ImageDataType[];
  handleOpenClose: (open: boolean) => void;
};

export const useOnSubmit = (): [(args: OnSubmitArgs) => void, boolean, boolean] => {
  const [postImages, { isLoading: isLoadingPostImage }] = usePostImageMutation();
  const [createPost, { isLoading: isLoadingCreatePost }] = useCreatePostMutation();

  const onPostSubmit = ({ description, imagesState, handleOpenClose }: OnSubmitArgs) => {
    (async function post() {
      const imagesFiles: File[] = [];

      for (const image of imagesState) {
        const blob = await getCroppedImage(image.previewURL, image.crop);
        const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
        imagesFiles.push(file);
      }

      if (imagesFiles) {
        const imagesData = new FormData();
        imagesFiles.forEach((imageFile) => {
          imagesData.append('file', imageFile);
        });

        const resultPostImage = await postImages(imagesData);

        if (resultPostImage) {
          const uploadId = resultPostImage.data?.images[0]?.uploadId;

          if (uploadId) {
            createPost({ description, uploadId });
            handleOpenClose(false);
          }
        }
      }
    })();
  };

  return [onPostSubmit, isLoadingPostImage, isLoadingCreatePost];
};
