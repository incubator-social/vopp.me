'use client';

import InfiniteScrollTrigger from '@/src/features/posts/InfiniteScrollTrigger';
import { useInfinitePosts } from '@/src/features/posts/lib/useInfinitePosts';
import PostsGrid from '@/src/features/posts/ui/PostsGrid/PostsGrid';

interface InfinitePostsProps {
  userId: number;
}

export default function InfinitePosts({ userId }: InfinitePostsProps) {
  const { posts, isLoading, isFetching, error, hasMore, loadMore } = useInfinitePosts(userId);

  if (error) {
    return <div>Error loading posts</div>;
  }

  return (
    <div>
      <PostsGrid posts={posts} isLoading={isLoading} />

      <InfiniteScrollTrigger onIntersect={loadMore} isFetching={isFetching} hasMore={hasMore} />

      {isFetching && <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>}

      {!hasMore && posts.length > 0 && (
        <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>All posts have been loaded</div>
      )}
    </div>
  );
}
