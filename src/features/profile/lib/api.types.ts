export type PublicProfileResponse = {
  id: number;
  userName: string;
  aboutMe: string;
  avatars: Array<{
    url: string;
    width: number;
    height: number;
    fileSize: number;
    createdAt: string;
  }>;
  userMetadata: {
    following: number;
    followers: number;
    publications: number;
  };
  hasPaymentSubscription: boolean;
  isFollowing: boolean;
  isFollowedBy: boolean;
};
