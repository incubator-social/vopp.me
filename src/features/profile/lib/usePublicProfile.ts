import { useGetPublicProfileQuery } from '../api/profileApi';

export const usePublicProfile = (profileId: number) => {
  const { data, isLoading, error } = useGetPublicProfileQuery(profileId);

  return {
    profile: data,
    isLoading,
    error
  };
};
