import styles from './HomePostCard.module.scss';
import { Post } from '../../../entities/post/model/posts.schemas';
import { formatRelativeTime } from '@/src/shared/lib/utils/formatRelativeTime';
import { Carousel } from '@/src/shared/ui/Carousel/Carousel';
import { useState } from 'react';
import clsx from 'clsx';
import { Avatar } from '@/src/shared/ui/Avatar/Avatar';

type Props = {
  post: Post;
};

export const HomePostCard = ({ post }: Props) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => setExpanded((prev) => !prev);

  const description =
    !expanded && post.description && post.description.length > 80
      ? post.description.slice(0, 80) + '...'
      : post.description;

  return (
    <div className={clsx(styles.card, expanded && styles.cardExpanded)}>
      {post.images.length > 0 && (
        <div className={clsx(styles.imageWrapper, expanded && styles.imageWrapperExpanded)}>
          <Carousel images={post.images} variant="small" />
        </div>
      )}

      <div className={styles.userInfo}>
        <Avatar src={post.avatarOwner} name={post.userName} size={36} />
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
