import { usePostImageMutation, useCreatePostMutation } from '@/src/entities/post/api/postsApi';

import { ImageDataType } from '../../../../model';

type OnSubmitArgs = {
  description: string;
  imagesState: ImageDataType[];
  handleOpenClose: (open: boolean) => void;
};

export const useOnSubmit = (): [(args: OnSubmitArgs) => void, boolean, boolean] => {
  const [postImages, { isLoading: isLoadingPostImage }] = usePostImageMutation();
  const [createPost, { isLoading: isLoadingCreatePost }] = useCreatePostMutation();

  const onPostSubmit = ({ description, imagesState, handleOpenClose }: OnSubmitArgs) => {
    const post = async () => {
      if (imagesState) {
        const imagesFiles = new FormData();
        imagesState.forEach((imageData) => {
          imagesFiles.append('file', imageData.file);
        });
        const resultPostImage = await postImages(imagesFiles);

        if (resultPostImage) {
          const uploadId = resultPostImage.data?.images[0]?.uploadId;

          if (uploadId) {
            createPost({ description, uploadId });
            handleOpenClose(false);
          }
        }
      }
    };
    post();
  };

  return [onPostSubmit, isLoadingPostImage, isLoadingCreatePost];
};
