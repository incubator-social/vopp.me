export type PostImage = {
  url: string;
  width: number;
  height: number;
  fileSize: number;
  createdAt: string;
  uploadId: string;
};

export type PostOwner = {
  firstName: string;
  lastName: string;
};

export type Post = {
  id: number;
  userName: string;
  description: string;
  location: string;
  images: PostImage[];
  createdAt: string;
  updatedAt: string;
  ownerId: number;
  avatarOwner: string;
  owner: PostOwner;
  likesCount: number;
  isLiked: boolean;
  avatarWhoLikes: boolean;
};

export type PostsResponse = {
  totalCount: number;
  pageSize: number;
  totalUsers: number;
  items: Post[];
};

export type PostsQueryParams = {
  userId: number;
  endCursorPostId?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
};
