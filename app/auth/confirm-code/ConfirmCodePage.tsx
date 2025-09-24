'use client';
import { ROUTES } from '@/src/shared/config/routes';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useConfirmRegistrationMutation } from '@/src/features/auth/api/authApi';

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
        console.error('Error during confirm code', error);
        const message = error?.data?.messages[0].message;
        console.log(message);

        if (message === 'Confirmation code is invalid') {
          console.log('User is already confirmed');
          // redirect(ROUTES.AUTH.SIGN_IN);
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
