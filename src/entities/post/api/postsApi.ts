import { PostsResponse, PostsResponseSchema } from '../model/posts.schemas';

import { baseApi } from '@/src/shared/api/baseApi';

export const publicPostsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query<PostsResponse, void>({
      query: () => ({
        url: '/public-posts/all/0',
        method: 'GET',
        params: { pageSize: 4, sortBy: 'createdAt', sortDirection: 'desc' }
      }),
      // валидируем через Zod
      transformResponse: (response: unknown) => PostsResponseSchema.parse(response),
      providesTags: ['Posts']
    })
  })
});

export const { useGetPostsQuery } = publicPostsApi;
