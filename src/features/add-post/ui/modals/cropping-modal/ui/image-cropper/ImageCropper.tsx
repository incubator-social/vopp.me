import { useState } from 'react';
import Cropper from 'react-easy-crop';

import styles from './ImageCropper.module.scss';

export type ImageCropperPropsType = {
  imageUrl: string;
};

export const ImageCropper = ({ imageUrl }: ImageCropperPropsType) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  // const [aspect, setAspect] = useState(1);

  return (
    <div>
      <Cropper
        crop={crop}
        image={imageUrl}
        onCropChange={setCrop}
        showGrid={false}
        classes={{
          mediaClassName: styles.media,
          cropAreaClassName: styles.cropArea,
          containerClassName: styles.container
        }}
      />
    </div>
  );
};
