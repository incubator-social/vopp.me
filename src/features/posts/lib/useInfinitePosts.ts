import { useState, useEffect, useRef, useCallback } from 'react';
import { useGetUserPostsQuery, postsApi } from '../api/postsApi';
import { useAppSelector } from '@/app/providers/store/hooks';

export const useInfinitePosts = (userId: number) => {
  const PAGE_SIZE = 8;

  const cachedCursor = useAppSelector(
    (state) =>
      postsApi.endpoints.getUserPosts
        .select({
          userId,
          endCursorPostId: undefined
        })(state)
        .data?.items?.slice(-1)[0]?.id
  );

  const [currentCursor, setCurrentCursor] = useState<number | undefined>(cachedCursor);
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
      pageSize: currentCursor ? PAGE_SIZE + 1 : PAGE_SIZE
    },
    {
      skip: currentCursor === undefined && initialLoadRef.current
    }
  );

  // useEffect(() => {
  //   setCurrentCursor(undefined);
  //   initialLoadRef.current = false;
  // }, [userId]);

  useEffect(() => {
    if (postsData?.items && currentCursor === undefined) {
      initialLoadRef.current = true;
    }
  }, [postsData, currentCursor]);

  const hasMore = postsData
    ? currentCursor
      ? postsData.items.length === PAGE_SIZE + 1
      : postsData.items.length === PAGE_SIZE
    : true;

  const loadMore = useCallback(() => {
    if (postsData?.items.length && !isFetching && hasMore) {
      const newCursorPost = postsData.items[postsData.items.length - 1].id;
      setCurrentCursor(newCursorPost);
    }
  }, [postsData, isFetching, hasMore]);

  return {
    posts: postsData?.items || [],
    isLoading,
    isFetching,
    error,
    hasMore,
    loadMore
  };
};
