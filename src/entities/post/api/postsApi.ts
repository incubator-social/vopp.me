import { Post, PostsResponse, PostImageResponse, PostsResponseSchema, PostSchema } from '../model/posts.schemas';

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
    postImage: build.mutation<PostImageResponse, FormData>({
      query: (images) => {
        return {
          url: 'posts/image',
          method: 'POST',
          body: images
        };
      }
    }),
    postPost: build.mutation<Post, { description: string; uploadId: string }>({
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
      })
      // invalidatesTags: ['Posts'] нужно раскомментировать и проверить актуальность тега
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
  useGetPublicPostsQuery,
  useGetPostByIdQuery,
  usePostImageMutation,
  usePostPostMutation,
  useDeletePostMutation,
  useUpdatePostByIdMutation
} = postsApi;
