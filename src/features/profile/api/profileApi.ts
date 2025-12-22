import { baseApi } from '@/src/shared/api/baseApi';
import { PublicProfileResponse } from '@/src/features/profile/lib/api.types';

export const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPublicProfile: build.query<PublicProfileResponse, number>({
      query: (profileId) => `public-user/profile/${profileId}`,
      providesTags: (_res, _err, profileId) => [{ type: 'Profile', id: profileId }]
    })
  })
});

export const { useGetPublicProfileQuery } = profileApi;
