import { baseApi } from '@/src/shared/api/baseApi';

export type PublicUserResponse = {
  totalCount: number;
};

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPublicUsers: build.query<PublicUserResponse, void>({
      query: () => ({
        url: 'public-user',
        method: 'GET'
      }),
      providesTags: ['User']
    })
  })
});

export const { useGetPublicUsersQuery } = userApi;
