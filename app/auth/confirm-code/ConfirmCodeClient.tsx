'use client';
import { ROUTES } from '@/src/shared/config/routes';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useConfirmRegistrationMutation } from '@/src/features/auth/api/authApi';

type ErrorType = {
  status: number;
  data: {
    error: string;
    messages: { message: string }[];
    statusCode: number;
  };
};

type ConfirmCodePage = {
  code: string[] | string | undefined;
};

const ConfirmCodePage = ({ code }: ConfirmCodePage) => {
  const [confirmRegistration] = useConfirmRegistrationMutation();
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    if (!code) return;

    const confirmCode = async () => {
      try {
        const result = await confirmRegistration(code).unwrap();
        if (result?.status === 204) {
          setIsConfirmed(true);
        }
      } catch (error) {
        console.error('Error during confirm code: ', error);

        const err = error as ErrorType;
        const message = err?.data?.messages[0].message || undefined;

        if (message === 'Confirmation code is invalid') {
          console.log('User is already confirmed');
          redirect(ROUTES.AUTH.SIGN_IN);
        }
      }
    };

    confirmCode();
  }, [code, confirmRegistration]);

  useEffect(() => {
    if (isConfirmed) {
      redirect(ROUTES.AUTH.EMAIL_VERIFICATION);
    }
  }, [isConfirmed]);

  return null;
};

export default ConfirmCodePage;
