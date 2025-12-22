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
    <div className={`${styles.imageWrapper} ${className}`}>
      <Image
        src={imageUrl}
        alt={alt}
        className={styles.image}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={85}
      />
    </div>
  );
};
