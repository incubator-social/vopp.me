import Image from 'next/image';
import styles from './PostCard.module.scss';
import { Post } from '../model/posts.schemas';
import { formatRelativeTime } from '@/src/shared/lib/utils/formatRelativeTime';

type Props = {
  post: Post;
};

export const PostCard = ({ post }: Props) => {
  const initial = post.userName?.[0]?.toUpperCase() ?? '?';

  let visibleText = post.description ? post.description : '';

  let isLong = false;
  if (post.description && post.description.length > 80) {
    visibleText = post.description.slice(0, 80) + '...';
    isLong = true;
  }

  return (
    <div className={styles.card}>
      {post.images.length > 0 && (
        <div className={styles.imageWrapper}>
          <Image
            src={post.images[0].url}
            alt={post.description ?? 'post'}
            width={234}
            height={240}
            className={styles.postImage}
          />
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
          {visibleText}
          {isLong && (
            <button type="button" className={styles.showMore} onClick={() => {}}>
              Show more
            </button>
          )}
        </p>
      </div>
    </div>
  );
};
