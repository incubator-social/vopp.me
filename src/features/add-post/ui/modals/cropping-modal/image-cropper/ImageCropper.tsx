import { useAppDispatch } from '@/app/lib/hooks';
import { updateCrop } from '@/src/features/add-post';
import { useState } from 'react';
import Cropper from 'react-easy-crop';

import styles from './ImageCropper.module.scss';

export type ImageCropperPropsType = {
  id: string;
  aspect: number;
  imageUrl: string;
};

export const ImageCropper = ({ id, aspect, imageUrl }: ImageCropperPropsType) => {
  const dispatch = useAppDispatch();
  const [crop, setCrop] = useState({ x: 0, y: 0 });

  return (
    <Cropper
      crop={crop}
      showGrid={false}
      image={imageUrl}
      onCropChange={setCrop}
      aspect={aspect as number}
      onCropComplete={(_, croppedAreaPixels) => {
        dispatch(updateCrop({ id, crop: croppedAreaPixels }));
      }}
      classes={{
        mediaClassName: styles.media,
        cropAreaClassName: styles.cropArea,
        containerClassName: styles.container
      }}
    />
  );
};
