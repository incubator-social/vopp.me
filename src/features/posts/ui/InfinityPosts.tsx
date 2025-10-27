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
    return <div>Ошибка загрузки постов</div>;
  }

  return (
    <div>
      <PostsGrid posts={posts} isLoading={isLoading} />

      <InfiniteScrollTrigger onIntersect={loadMore} isFetching={isFetching} hasMore={hasMore} />

      {isFetching && <div style={{ textAlign: 'center', padding: '20px' }}>Загрузка...</div>}

      {!hasMore && posts.length > 0 && (
        <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>Все посты загружены</div>
      )}
    </div>
  );
}
