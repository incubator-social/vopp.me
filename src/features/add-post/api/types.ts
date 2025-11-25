export type PostImageResponse = {
  url: string;
  width: number;
  height: number;
  fileSize: number;
  createdAt: string;
  uploadId: string;
};

export type PostImagesResponse = PostImageResponse[];

export type PostDescriptionRequest = {
  description: string;
  childrenMetadata: [
    {
      uploadId: string;
    }
  ];
};

export type PostDescriptionResponse = {
  id: number;
  userName: string;
  description: string;
  location: string;
  images: PostImagesResponse;
  createdAt: string;
  updatedAt: string;
  ownerId: number;
  avatarOwner: string;
  owner: {
    firstName: string;
    lastName: string;
  };
  likesCount: number;
  isLiked: boolean;
  avatarWhoLikes: boolean;
};
