import { AppDispatch } from '@/app/model';
import { ImageDataType, removeImages } from '@/src/features/add-post/model';
import { closeAddPost, setActiveButton } from '@/src/widgets/sidebar-wrapper/model';

export type UseOnConfirmDiscardArgs = {
  dispatch: AppDispatch;
  imagesState: ImageDataType[];
  previousActiveButton: string | undefined;
  setToConfirm: (value: boolean) => void;
};

export const onConfirmDiscard = ({
  dispatch,
  imagesState,
  setToConfirm,
  previousActiveButton
}: UseOnConfirmDiscardArgs) => {
  if (imagesState) {
    for (const image of imagesState) {
      URL.revokeObjectURL(image.previewURL);
    }
    dispatch(removeImages());
  }
  setToConfirm(false);
  dispatch(closeAddPost());
  dispatch(setActiveButton(previousActiveButton));
};
