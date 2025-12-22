import { Post, PostsResponse, PostImageResponse, PostsResponseSchema, PostSchema } from '../model/posts.schemas';

import { baseApi } from '@/src/shared/api/baseApi';
import { GetPublicPostsArgs, PostsQueryParams } from '../model/posts.types';
import { ar } from 'zod/v4/locales/index.cjs';

export const postsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUserPosts: build.query<PostsResponse, PostsQueryParams>({
      query: ({ userId, endCursorPostId, pageSize = 4, sortDirection = 'desc' }) => {
        const url = endCursorPostId ? `posts/user/${userId}/${endCursorPostId}` : `posts/user/${userId}`;

        return {
          url,
          params: {
            pageSize,
            sortDirection
          }
        };
      },
      transformResponse: (response: unknown) => PostsResponseSchema.parse(response),
      serializeQueryArgs: ({ queryArgs }) => {
        return `user-${queryArgs.userId}`;
      },
      merge: (currentCache, newItems, { arg }) => {
        // обновляем totalCount (важно при delete)
        currentCache.totalCount = newItems.totalCount;

        // первая страница — заменить
        if (!arg.endCursorPostId) {
          currentCache.items = newItems.items;
          return;
        }

        // следующие — дописать, но без дублей
        const existing = new Set(currentCache.items.map((p) => p.id));
        const toAdd = newItems.items.filter((p) => !existing.has(p.id));
        currentCache.items.push(...toAdd);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.endCursorPostId !== previousArg?.endCursorPostId;
      },
      providesTags: (result, _err, arg) =>
        result
          ? [
              { type: 'Posts', id: `USER-${arg.userId}` },
              ...result.items.map((p) => ({ type: 'Post' as const, id: p.id }))
            ]
          : [{ type: 'Posts', id: `USER-${arg.userId}` }]
    }),
    getPublicPosts: build.query<PostsResponse, GetPublicPostsArgs>({
      query: ({ endCursorPostId, pageSize, sortBy, sortDirection }) => ({
        url: `/public-posts/all/${endCursorPostId}`,
        method: 'GET',
        params: { pageSize, sortBy, sortDirection }
      }),
      transformResponse: (response: unknown) => PostsResponseSchema.parse(response),
      providesTags: (result) =>
        result
          ? [{ type: 'PublicPosts', id: 'LIST' }, ...result.items.map((p) => ({ type: 'Post' as const, id: p.id }))]
          : [{ type: 'PublicPosts', id: 'LIST' }]
    }),
    getPostById: build.query<Post, number>({
      query: (postId) => ({
        url: `/posts/id/${postId}`,
        method: 'GET'
      }),
      transformResponse: (response: unknown) => PostSchema.parse(response),
      providesTags: (_result, _err, postId) => [{ type: 'Post', id: postId }]
    }),
    postImage: build.mutation<PostImageResponse, FormData>({
      query: (images) => {
        return {
          url: 'posts/image',
          method: 'POST',
          body: images
        };
      }
    }),
    createPost: build.mutation<Post, { description: string; uploadId: string }>({
      query: ({ description, uploadId }) => ({
        url: 'posts',
        method: 'POST',
        body: {
          description,
          childrenMetadata: [{ uploadId }]
        }
      })
    }),
    deletePost: build.mutation<void, { postId: number; userId: number }>({
      query: ({ postId }) => ({
        url: `/posts/${postId}`,
        method: 'DELETE'
      }),
      async onQueryStarted({ postId, userId }, { dispatch, queryFulfilled }) {
        const patchUser = dispatch(
          postsApi.util.updateQueryData('getUserPosts', { userId, endCursorPostId: undefined }, (draft) => {
            draft.items = draft.items.filter((p) => p.id !== postId);
            draft.totalCount = Math.max(0, (draft.totalCount ?? 0) - 1);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchUser.undo();
        }
      },
      invalidatesTags: (_res, _err, { postId, userId }) => [
        { type: 'Post', id: postId },
        { type: 'Posts', id: `USER-${userId}` },
        { type: 'PublicPosts', id: 'LIST' },
        { type: 'Profile', id: userId }
      ]
    }),
    updatePostById: build.mutation<void, { postId: number; data: { description: string } }>({
      query: ({ postId, data }) => ({
        url: `/posts/${postId}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: (_res, _err, { postId }) => [{ type: 'Post', id: postId }]
    })
  }),
  overrideExisting: true
});

export const {
  useGetUserPostsQuery,
  useGetPublicPostsQuery,
  useGetPostByIdQuery,
  usePostImageMutation,
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostByIdMutation
} = postsApi;
