export type ForgotPasswordRequest = {
  email: string;
  recaptcha: string | null;
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

export type CheckRecoveryCodeRequest = {
  recoveryCode: string;
};

export type CheckRecoveryCodeResponse = {
  email: string;
};

export type ErrorResponse = {
  statusCode: number;
  messages: [
    {
      message: string;
      field: string;
    }
  ];
  error: string;
};
