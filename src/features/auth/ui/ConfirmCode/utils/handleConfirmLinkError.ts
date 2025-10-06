import { ModalData } from '@/src/features/auth/ui/ConfirmCode/ConfirmCode';
import { Status } from '@/src/features/auth/ui/ConfirmCode/utils/getRedirectPath';

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

export const handleConfirmLinkError = (
  error: ConfirmCodeError,
  setIsModal: (modalData: ModalData) => void,
  setStatus: (status: Status | null) => void
) => {
  const errorMessage = error?.data?.messages[0].message || undefined;

  switch (errorMessage) {
    case confirmLinkErrorMessage.invalid:
      setIsModal({ open: true, title: 'User is exist', message: 'Go to the Sign In page' });
      break;
    case confirmLinkErrorMessage.expired:
      setStatus('expired');
      break;
    default:
      return;
  }
};
