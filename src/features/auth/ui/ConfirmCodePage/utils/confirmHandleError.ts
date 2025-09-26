export type ConfirmCodeError = {
  status: number;
  data: {
    error: string;
    messages: { message: string }[];
    statusCode: number;
  };
};

export const confirmHandleError = (error: ConfirmCodeError, onOpenModal: (isModal: boolean) => void) => {
  const errorMessage = error?.data?.messages[0].message || undefined;

  switch (errorMessage) {
    case 'Confirmation code is invalid':
      onOpenModal(true);
      break;
    default:
      return;
  }
};
