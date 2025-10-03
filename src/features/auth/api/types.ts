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
