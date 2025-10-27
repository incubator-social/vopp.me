import { PostsResponse, PostsQueryParams } from '../lib/types/api.types';
import { baseApi } from '@/src/shared/api/baseApi';

export const postsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUserPosts: build.query<PostsResponse, PostsQueryParams>({
      query: ({ userId, endCursorPostId, pageSize = 3, sortDirection = 'desc' }) => {
        const url = endCursorPostId ? `posts/user/${userId}/${endCursorPostId}` : `posts/user/${userId}`;

        return {
          url,
          params: {
            pageSize,
            sortDirection
          }
        };
      },
      serializeQueryArgs: ({ queryArgs }) => {
        return `user-${queryArgs.userId}`;
      },
      merge: (currentCache, newItems) => {
        if (newItems.items.length === 0) {
          return currentCache;
        }

        return {
          ...newItems,
          items: [...(currentCache?.items || []), ...newItems.items]
        };
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.endCursorPostId !== previousArg?.endCursorPostId;
      },
      providesTags: ['Posts']
    })
  })
});

export const { useGetUserPostsQuery } = postsApi;
