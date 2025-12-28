import { useState, useEffect, useCallback } from 'react';
import { useGetUserPostsQuery } from '@/src/entities/post/api/postsApi';
import { Post } from '@/src/entities/post/model/posts.schemas';

const EMPTY_POSTS: Post[] = [];
export const useInfinitePosts = (userId: number) => {
  const PAGE_SIZE = 8;

  const [cursor, setCursor] = useState<number | undefined>(undefined);

  const { data, isLoading, isFetching, error } = useGetUserPostsQuery({
    userId,
    endCursorPostId: cursor,
    pageSize: PAGE_SIZE,
    sortDirection: 'desc'
  });

  // при смене userId сбрасываем курсор
  useEffect(() => {
    setCursor(undefined);
  }, [userId]);

  const posts = data?.items ?? EMPTY_POSTS;
  const totalCount = data?.totalCount ?? 0;

  const hasMore = totalCount === 0 ? true : posts.length < totalCount;

  const loadMore = useCallback(() => {
    if (!hasMore || isFetching || posts.length === 0) return;
    setCursor(posts[posts.length - 1].id);
  }, [hasMore, isFetching, posts]);

  return {
    posts,
    isLoading,
    isFetching,
    error,
    hasMore,
    loadMore
  };
};
