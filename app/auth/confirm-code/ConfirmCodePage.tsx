'use client';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { useConfirmRegistrationMutation } from '@/src/features/auth/api/authApi';

type ConfirmCodePage = {
  code: string[] | string | undefined;
  email: string[] | string | undefined;
};

const ConfirmCodePage = ({ code, email }: ConfirmCodePage) => {
  const [confirmRegistration] = useConfirmRegistrationMutation();

  useEffect(() => {
    redirect();
  }, [code, email, router, confirmRegistration]);

  return <div></div>;
};

export default ConfirmCodePage;
