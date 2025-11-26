import styles from './PostsGrid.module.scss';
import { Post } from '@/src/features/posts/lib/types/api.types';
import { PostImage } from '@/src/features/posts/ui/PostImage/PostImage';

type PostsGridProps = {
  posts: Post[];
  isLoading?: boolean;
};

export default function PostsGrid({ posts, isLoading }: PostsGridProps) {
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
            <PostImage
              postId={post.id}
              imageUrl={post.images[0]?.url}
              alt={post.description || 'Post image'}
              className={styles.image}
            />
          </div>
        ))}
      </div>
    </>
  );
}
