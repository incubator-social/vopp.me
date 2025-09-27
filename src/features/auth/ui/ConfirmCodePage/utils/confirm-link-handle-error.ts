export type ConfirmCodeError = {
  status: number;
  data: {
    error: string;
    messages: { message: string }[];
    statusCode: number;
  };
};

export const confirmLinkErrorMessage = {
  invalid: 'Confirmation code is invalid',
  expired: 'Confirmation code is expired'
};

export const confirmLinkHandleError = (error: ConfirmCodeError, onOpenModal: (isModal: boolean) => void) => {
  const errorMessage = error?.data?.messages[0].message || undefined;

  switch (errorMessage) {
    case confirmLinkErrorMessage.invalid:
      onOpenModal(true);
      break;
    default:
      return;
  }
};
