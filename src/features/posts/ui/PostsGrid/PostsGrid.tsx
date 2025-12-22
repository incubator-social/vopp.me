import styles from './PostsGrid.module.scss';
import { PostImage } from '@/src/features/posts/ui/PostImage/PostImage';
import { PostsGridSkeleton } from '@/src/features/posts/ui/PostsGridSkeleton/PostsGridSkeleton';
import { Post } from '@/src/entities/post/model/posts.schemas';

type PostsGridProps = {
  posts: Post[];
  isLoading?: boolean;
  onPostClick?: (postId: number) => void;
};

export default function PostsGrid({ posts, isLoading, onPostClick }: PostsGridProps) {
  if (isLoading && posts.length === 0) {
    return <PostsGridSkeleton />;
  }

  if (!posts.length && !isLoading) {
    return <div className={styles.empty}>No posts yet</div>;
  }

  return (
    <>
      <div className={styles.grid}>
        {posts.map((post) => (
          <div key={post.id} className={styles.gridItem} onClick={() => onPostClick?.(post.id)}>
            <PostImage imageUrl={post.images[0]?.url || ''} alt={post.description || 'Post image'} />
          </div>
        ))}
      </div>
    </>
  );
}
