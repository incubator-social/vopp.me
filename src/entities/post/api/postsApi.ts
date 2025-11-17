import { PostSchema, Post, PostsResponse, PostsResponseSchema } from '../model/posts.schemas';

import { baseApi } from '@/src/shared/api/baseApi';
import { GetPublicPostsArgs } from '../model/posts.types';

export const postsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
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
    deletePost: build.mutation<void, number>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE'
      })
      // invalidatesTags: ['Posts'] нужно раскомментировать и проверить актуальность тега
    })
  }),
  overrideExisting: true
});

export const { useGetPublicPostsQuery, useGetPostByIdQuery, useDeletePostMutation } = postsApi;
