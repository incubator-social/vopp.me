import Image from 'next/image';
import styles from './Avatar.module.scss';
import clsx from 'clsx';

type Props = {
  src?: string | null;
  alt?: string;
  name?: string;
  size?: number;
  className?: string;
};

export const Avatar = ({ src, alt = 'avatar', name, size = 36, className }: Props) => {
  const fallback = name?.trim()?.[0]?.toUpperCase() ?? '?';

  return (
    <div className={clsx(styles.avatarWrapper, className)} style={{ width: size, height: size }}>
      {src ? (
        <Image src={src} alt={alt} width={size} height={size} className={styles.avatarImage} />
      ) : (
        <div className={styles.avatarFallback} style={{ fontSize: Math.floor(size / 2.5) }}>
          {fallback}
        </div>
      )}
    </div>
  );
};
