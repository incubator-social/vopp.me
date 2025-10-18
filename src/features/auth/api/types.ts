export type LoginBody = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
};

export type SignUpRequest = {
  userName: string;
  email: string;
  password: string;
  baseUrl?: string;
};

export type SignUpResponse = {
  status: string | number | undefined;
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

export type GoogleOAuthResponse = {
  accessToken: string | undefined;
  email: string | undefined;
  status: string | number | undefined;
};

export type GoogleOAuthRequest = {
  redirectUrl?: string;
  code: string;
};
