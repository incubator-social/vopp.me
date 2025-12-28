import Image from 'next/image';

import styles from './PreviewImageAspect.module.scss';

export type PreviewImageAspectPropsType = {
  aspect: number;
  previewUrl: string;
};

export const PreviewImageAspect = ({ aspect, previewUrl }: PreviewImageAspectPropsType) => {
  return (
    <div className={styles.imageAspectPreview} data-aspect={aspect}>
      <Image src={previewUrl} alt="preview uploaded image" className={styles.image} fill />
    </div>
  );
};
