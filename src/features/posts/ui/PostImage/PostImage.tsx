import Image from 'next/image';
import styles from './PostImage.module.scss';

type PostImageProps = {
  imageUrl: string;
  alt: string;
  className?: string;
};

export const PostImage = ({ imageUrl, alt, className = '' }: PostImageProps) => {
  if (!imageUrl) {
    return <div className={`${styles.fallback} ${className}`}>📷</div>;
  }

  return (
    <Image
      src={imageUrl}
      alt={alt}
      className={`${styles.image} ${className}`}
      width={234}
      height={228}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      quality={85}
    />
  );
};
