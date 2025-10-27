import { useState, useEffect } from 'react';
import { useGetUserPostsQuery } from '../api/postsApi';

export const useInfinitePosts = (userId: number) => {
  const [currentCursor, setCurrentCursor] = useState<number | undefined>();

  const {
    data: postsData,
    isLoading,
    isFetching,
    error
  } = useGetUserPostsQuery({
    userId,
    endCursorPostId: currentCursor,
    pageSize: 3
  });

  useEffect(() => {
    setCurrentCursor(undefined);
  }, [userId]);

  const loadMore = () => {
    if (postsData?.items.length && !isFetching && hasMore) {
      const lastPostId = postsData.items[postsData.items.length - 1].id;
      setCurrentCursor(lastPostId);
    }
  };

  const hasMore = postsData ? postsData.items.length < postsData.totalCount : true;

  return {
    posts: postsData?.items || [],
    isLoading,
    isFetching,
    error,
    hasMore,
    loadMore
  };
};
