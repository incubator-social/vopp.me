import styles from './PostsGrid.module.scss';
import { Post } from '@/src/features/posts/lib/types/api.types';
import Image from 'next/image';
import { useState } from 'react';

type PostsGridProps = {
  posts: Post[];
  isLoading?: boolean;
};

export default function PostsGrid({ posts, isLoading }: PostsGridProps) {
  const [brokenImages, setBrokenImages] = useState<Set<number>>(new Set());

  const handleImageError = (postId: number) => {
    console.log(`Image failed to load for post ${postId}`);
    setBrokenImages((prev) => new Set(prev).add(postId));
  };

  if (isLoading && posts.length === 0) {
    return (
      <div className={styles.grid}>
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className={styles.skeleton} />
        ))}
      </div>
    );
  }

  if (!posts.length && !isLoading) {
    return <div className={styles.empty}>No posts yet</div>;
  }

  return (
    <>
      <div className={styles.grid}>
        {posts.map((post) => (
          <div key={post.id} className={styles.gridItem}>
            {brokenImages.has(post.id) ? (
              <div className={styles.brokenImage}>📷</div>
            ) : (
              <Image
                src={post.images[0]?.url}
                alt={post.description || 'Post image'}
                className={styles.image}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}
                onError={() => handleImageError(post.id)}
                unoptimized
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
