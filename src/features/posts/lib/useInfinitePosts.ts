import { useState, useEffect, useRef } from 'react';
import { useGetUserPostsQuery } from '../api/postsApi';

export const useInfinitePosts = (userId: number) => {
  const [currentCursor, setCurrentCursor] = useState<number | undefined>();
  const initialLoadRef = useRef(false);

  const {
    data: postsData,
    isLoading,
    isFetching,
    error
  } = useGetUserPostsQuery(
    {
      userId,
      endCursorPostId: currentCursor,
      pageSize: 8
    },
    {
      skip: currentCursor === undefined && initialLoadRef.current
    }
  );

  useEffect(() => {
    setCurrentCursor(undefined);
    initialLoadRef.current = false;
  }, [userId]);

  useEffect(() => {
    if (postsData?.items && currentCursor === undefined) {
      initialLoadRef.current = true;
    }
  }, [postsData, currentCursor]);

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
