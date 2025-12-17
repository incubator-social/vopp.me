'use client';

import InfiniteScrollTrigger from '@/src/features/posts/ui/InfiniteScrollTrigger/InfiniteScrollTrigger';
import { useInfinitePosts } from '@/src/features/posts/lib/useInfinitePosts';
import PostsGrid from '@/src/features/posts/ui/PostsGrid/PostsGrid';
import styles from './InfinityPosts.module.scss';

type InfinitePostsProps = {
  userId: number;
  onPostClick?: (postId: number) => void;
};

export default function InfinitePosts({ userId, onPostClick }: InfinitePostsProps) {
  const { posts, isLoading, isFetching, error, hasMore, loadMore } = useInfinitePosts(userId);

  if (error) {
    return <div>Error loading posts</div>;
  }

  return (
    <div>
      <PostsGrid posts={posts} isLoading={isLoading} onPostClick={onPostClick} />

      <InfiniteScrollTrigger onIntersect={loadMore} isFetching={isFetching} hasMore={hasMore} />

      {isFetching && <div className={styles.loading}>Loading...</div>}

      {!hasMore && !isFetching && posts.length > 0 && <div className={styles.footer}>All posts have been loaded</div>}
    </div>
  );
}
