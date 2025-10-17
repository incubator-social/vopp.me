import Image from 'next/image';
import styles from './PostCard.module.scss';

export const PostCard = ({ post }) => {
  const createdAt = new Date(post.createdAt);
  //const timeAgo = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  const diffMinutes = Math.floor((Date.now() - createdAt.getTime()) / (1000 * 60));

  return (
    <div className={styles.card}>
      {/* Фото поста */}
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

      {/* Информация о пользователе */}
      <div className={styles.userInfo}>
        {post.avatarOwner && (
          <Image src={post.avatarOwner} alt={post.userName} width={36} height={36} className={styles.avatar} />
        )}
        <div>
          <p className={styles.userName}>{post.userName}</p>
          <p className={styles.time}>
            {diffMinutes < 60 ? `${diffMinutes} min ago` : `${Math.floor(diffMinutes / 60)} h ago`}
          </p>
        </div>
      </div>

      {/* Описание поста */}
      <p className={styles.description}>
        {post.description?.length && post.description.length > 50
          ? post.description.slice(0, 50) + '... Show more'
          : post.description}
      </p>
    </div>
  );
};
