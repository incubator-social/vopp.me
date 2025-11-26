import { useState } from 'react';
import Image from 'next/image';
import styles from './PostImage.module.scss';

type PostImageProps = {
  postId: number;
  imageUrl: string;
  alt: string;
  className?: string;
};

export const PostImage = ({ postId, imageUrl, alt, className = '' }: PostImageProps) => {
  const [isBroken, setIsBroken] = useState(false);

  const handleImageError = () => {
    console.log(`Image failed to load for post ${postId}`);
    setIsBroken(true);
  };

  if (isBroken) {
    return <div className={`${styles.brokenImage} ${className}`}>📷</div>;
  }

  return (
    <Image
      src={imageUrl}
      alt={alt}
      className={`${styles.image} ${className}`}
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: '100%', height: 'auto' }}
      onError={handleImageError}
      unoptimized
    />
  );
};
