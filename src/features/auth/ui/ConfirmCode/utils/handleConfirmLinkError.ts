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
  invalid: 'Confirmation code is invalid'
};

export const handleConfirmLinkError = (error: ConfirmCodeError, setStatus: (status: Status | null) => void) => {
  const errorMessage = error?.data?.messages[0].message || undefined;

  switch (errorMessage) {
    case confirmLinkErrorMessage.invalid:
      setStatus('invalid');
      break;
    default:
      return;
  }
};
