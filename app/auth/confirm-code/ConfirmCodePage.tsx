'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useConfirmRegistrationMutation } from '@/src/features/auth/api/authApi';

type ConfirmCodePage = {
  code: string;
  email: string;
};

const ConfirmCodePage = ({ code, email }: ConfirmCodePage) => {
  const router = useRouter();
  const [confirmRegistration] = useConfirmRegistrationMutation();

  useEffect(() => {}, [code, email, router, confirmRegistration]);

  return <div></div>;
};

export default ConfirmCodePage;
