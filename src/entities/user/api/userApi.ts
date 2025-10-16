import { baseApi } from '@/src/shared/api/baseApi';

export type PublicUserResponse = {
  totalCount: number;
};

export const publicUserApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPublicUserCount: build.query<PublicUserResponse, void>({
      query: () => ({
        url: 'public-user',
        method: 'GET'
      })
    })
  })
});

export const { useGetPublicUserCountQuery } = publicUserApi;
