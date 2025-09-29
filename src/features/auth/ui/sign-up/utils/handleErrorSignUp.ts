import { MultipleFieldErrors } from 'react-hook-form';

type SignUpServerError = {
  statusCode: number;
  messages: { message: string; field: string }[];
  error: string;
};
type FormErrorMessage = string | undefined;
type HandleError = FormErrorMessage | SignUpServerError;

export const handleErrorSignUp = (error: HandleError) => {
  let errorMessage;

  if (typeof error === 'string') {
    errorMessage = error;
  }

  return errorMessage;
};
