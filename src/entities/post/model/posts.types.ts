export type GetPublicPostsArgs = {
  endCursorPostId?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
};

export type PostsQueryParams = {
  userId: number;
  endCursorPostId?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
};
