import { Post, PostsResponse, PostImageResponse, PostsResponseSchema, PostSchema } from '../model/posts.schemas';

import { baseApi } from '@/src/shared/api/baseApi';
import { GetPublicPostsArgs, PostsQueryParams } from '../model/posts.types';

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
      serializeQueryArgs: ({ queryArgs }) => {
        return `user-${queryArgs.userId}`;
      },
      merge: (currentCache, newItems) => {
        if (newItems.items.length === 0) {
          return currentCache;
        }

        currentCache.items.push(...newItems.items);
        return currentCache;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.endCursorPostId !== previousArg?.endCursorPostId;
      },
      providesTags: ['Posts']
    }),
    getPublicPosts: build.query<PostsResponse, GetPublicPostsArgs>({
      query: ({ endCursorPostId, pageSize, sortBy, sortDirection }) => ({
        url: `/public-posts/all/${endCursorPostId}`,
        method: 'GET',
        params: { pageSize, sortBy, sortDirection }
      }),
      // валидируем через Zod
      transformResponse: (response: unknown) => PostsResponseSchema.parse(response),
      providesTags: ['PublicPosts']
    }),
    getPostById: build.query<Post, number>({
      query: (postId) => ({
        url: `/posts/id/${postId}`,
        method: 'GET'
      }),
      transformResponse: (response: unknown) => PostSchema.parse(response),
      providesTags: ['Post']
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
    deletePost: build.mutation<void, number>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Posts']
    }),
    updatePostById: build.mutation<void, { postId: number; data: { description: string } }>({
      query: ({ postId, data }) => ({
        url: `/posts/${postId}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Post']
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
