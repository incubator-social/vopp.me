import Image from 'next/image';
import styles from './PostCard.module.scss';
import { Post } from '../model/posts.schemas';
import { formatRelativeTime } from '@/src/shared/lib/utils/formatRelativeTime';
import { Carousel } from '@/src/shared/ui/Carousel/Carousel';
import { useState } from 'react';

type Props = {
  post: Post;
};

export const PostCard = ({ post }: Props) => {
  const [expanded, setExpanded] = useState(false); // 👈 состояние для Show more
  const initial = post.userName?.[0]?.toUpperCase() ?? '?';

  const toggleExpand = () => setExpanded((prev) => !prev);

  // если expanded=false — показываем только кусок
  const description =
    !expanded && post.description && post.description.length > 80
      ? post.description.slice(0, 80) + '...'
      : post.description;

  return (
    <div className={styles.card}>
      {post.images.length > 0 && (
        <div
          className={styles.imageWrapper}
          style={{ height: expanded ? 120 : 240 }} // 👈 уменьшаем картинку при expanded
        >
          <Carousel images={post.images} variant="small" />
        </div>
      )}

      <div className={styles.userInfo}>
        {post.avatarOwner ? (
          <Image src={post.avatarOwner} alt={post.userName} width={36} height={36} className={styles.avatar} />
        ) : (
          <div className={styles.avatarFallback}>{initial}</div>
        )}
        <div>
          <p className={styles.userName}>{post.userName}</p>
        </div>
      </div>

      <div>
        <p className={styles.time}>{formatRelativeTime(post.createdAt)}</p>
      </div>

      <div>
        <p className={styles.description}>
          {description}
          {post.description && post.description.length > 80 && (
            <button type="button" className={styles.showMore} onClick={toggleExpand}>
              {expanded ? 'Hide' : 'Show more'}
            </button>
          )}
        </p>
      </div>
    </div>
  );
};
