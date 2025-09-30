export type ForgotPasswordRequest = {
  email: string;
  recaptcha: boolean;
  baseUrl: string;
};

export type ForgotPasswordResponse = {
  message: string;
};

export type CreateNewPasswordRequest = {
  newPassword: string;
  recoveryCode: string;
};

export type CreateNewPasswordResponse = {
  message: string;
};
