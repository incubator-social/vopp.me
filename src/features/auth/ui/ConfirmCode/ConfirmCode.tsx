'use client';

import {
  handleConfirmLinkError,
  ConfirmCodeError,
  Status,
  getRedirectPath
} from '@/src/features/auth/ui/ConfirmCode/utils';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useConfirmRegistrationMutation } from '@/src/features/auth/api/authApi';

type SearchParams = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export type ModalData = {
  open: boolean;
  title: string;
  message: string;
};

export const ConfirmCode = ({ searchParams }: SearchParams) => {
  const [confirmRegistration] = useConfirmRegistrationMutation();
  const [params, setParams] = useState<{ [key: string]: string | string[] | undefined } | null>(null);

  const [status, setStatus] = useState<Status | null>(null);

  const path = getRedirectPath(status);
  const router = useRouter();

  useEffect(() => {
    const fetchSearchParams = async () => {
      const data = await searchParams;
      setParams(data);
    };
    fetchSearchParams();
  }, [searchParams]);

  const { code } = params || {};

  useEffect(() => {
    if (!code) return;
    const confirmCode = async () => {
      try {
        const result = await confirmRegistration(code as string).unwrap();
        if (result?.status === 204) {
          setStatus('confirmed');
        }
      } catch (error) {
        const err = error as ConfirmCodeError;
        handleConfirmLinkError(err, setStatus);
      }
    };
    confirmCode();
  }, [code, confirmRegistration]);

  useEffect(() => {
    if (path) {
      router.replace(path);
    }
  }, [path, router]);

  if (!code) return <div>Loading...</div>;
};
