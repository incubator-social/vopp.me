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
import { AlertModal } from '@/src/shared/ui/AlertModal';

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

  const [isModal, setIsModal] = useState<ModalData>({ open: false, title: '', message: '' });
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
        handleConfirmLinkError(err, setIsModal, setStatus);
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

  return (
    <div>
      {isModal.open && (
        <AlertModal
          open={isModal.open}
          onOpenChange={(open) => setIsModal((prev) => ({ ...prev, open }))}
          title={isModal.title}
          message={isModal.message}
          onConfirm={() => setStatus('invalid')}
        />
      )}
    </div>
  );
};
