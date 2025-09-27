'use client';
import {
  ConfirmCodeError,
  confirmLinkHandleError
} from '@/src/features/auth/ui/ConfirmCodePage/utils/confirm-link-handle-error';
import { useConfirmLinkRedirect } from '@/src/features/auth/ui/ConfirmCodePage/utils/redirectHook';
import { ROUTES } from '@/src/shared/config/routes';
import { redirect } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { useConfirmRegistrationMutation } from '@/src/features/auth/api/authApi';
import { AlertModal } from '@/src/shared/ui/AlertModal';

type searchParams = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const ConfirmCodePage = ({ searchParams }: searchParams) => {
  const [confirmRegistration] = useConfirmRegistrationMutation();

  const [isModal, setIsModal] = useState(false);
  const [path, setStatus] = useConfirmLinkRedirect();

  // const [isConfirmed, setIsConfirmed] = useState(false);
  // const [redirectToSignIn, setRedirectToSignIn] = useState(false);

  const { code } = use(searchParams);

  useEffect(() => {
    if (!code) return;

    const confirmCode = async () => {
      try {
        const result = await confirmRegistration(code).unwrap();
        if (result?.status === 204) {
          setIsConfirmed(true);
        }
      } catch (error) {
        const err = error as ConfirmCodeError;
        console.error('Error during confirm code: ', err);
        confirmLinkHandleError(err, setIsModal);
      }
    };

    confirmCode();
  }, [code, confirmRegistration]);

  useEffect(() => {
    if (isConfirmed) {
      redirect(ROUTES.AUTH.EMAIL_VERIFICATION);
    }
    if (redirectToSignIn) {
      redirect(ROUTES.AUTH.SIGN_IN);
    }
  }, [isConfirmed, redirectToSignIn]);

  return (
    <div>
      {isModal && (
        <AlertModal
          open={isModal}
          onOpenChange={(open) => setIsModal(open)}
          title={'User is exist'}
          message={'Go to the Sign In page'}
          onConfirm={() => setRedirectToSignIn(true)}
        />
      )}
    </div>
  );
};

export default ConfirmCodePage;
