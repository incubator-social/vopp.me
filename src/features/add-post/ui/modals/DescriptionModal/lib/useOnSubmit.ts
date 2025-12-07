import { usePostImageMutation, usePostPostMutation } from '@/src/entities/post/api/postsApi';
import { ImageData } from '@/src/features/add-post/types';

type OnSubmitArgs = {
  description: string;
  imagesState: ImageData[];
  handleOpenClose: (open: boolean) => void;
};

export const useOnSubmit = (): [(args: OnSubmitArgs) => void, boolean, boolean] => {
  const [postImages, { isLoading: isLoadingPostImage }] = usePostImageMutation();
  const [postPost, { isLoading: isLoadingPostPost }] = usePostPostMutation();

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
            postPost({ description, uploadId });
            handleOpenClose(false);
          }
        }
      }
    };
    post();
  };

  return [onPostSubmit, isLoadingPostImage, isLoadingPostPost];
};
