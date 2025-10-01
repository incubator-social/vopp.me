export type LoginBody = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
};

export type MeResponse = {
  userId: number;
  userName: string;
  email: string;
  isBlocked: boolean;
};

export type UpdateTokensResponse = {
  accessToken: string;
};
