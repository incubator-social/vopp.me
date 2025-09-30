'use client';
import {
  ConfirmCodeError,
  handleConfirmLinkError
} from '@/src/features/auth/ui/ConfirmCodePage/utils/handleConfirmLinkError';
import { getRedirectPath, Status } from '@/src/features/auth/ui/ConfirmCodePage/utils/getRedirectPath';
import { redirect } from 'next/navigation';
import { use, useEffect, useState } from 'react';
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

const ConfirmCodePage = ({ searchParams }: SearchParams) => {
  const [confirmRegistration] = useConfirmRegistrationMutation();

  const [isModal, setIsModal] = useState<ModalData>({ open: false, title: '', message: '' });

  const [status, setStatus] = useState<Status | null>(null);
  const path = getRedirectPath(status);

  const { code } = use(searchParams);

  useEffect(() => {
    if (!code) return;

    const confirmCode = async () => {
      try {
        const result = await confirmRegistration(code).unwrap();
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
      redirect(path);
    }
  }, [path]);

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

export default ConfirmCodePage;
