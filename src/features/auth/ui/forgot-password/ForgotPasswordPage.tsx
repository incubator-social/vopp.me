'use client';

import { ForgotPasswordForm } from '@/src/features/auth/ui/forgot-password/ForgotPasswordForm/ForgotPasswordForm';
import Card from '@/src/shared/ui/Card/Card';
import { useState } from 'react';
import { AlertModal } from '@/src/shared/ui/AlertModal';
import { Alert } from '@/src/shared/ui/Alerts/Alert';

export const ForgotPasswordPage = () => {
  const [sentEmail, setSentEmail] = useState<string>('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <Card>
      <ForgotPasswordForm
        onSubmitSuccess={(email) => {
          setSentEmail(email);
          setModalIsOpen(true);
        }}
      />
      <AlertModal
        open={modalIsOpen}
        onOpenChange={setModalIsOpen}
        title="Email sent"
        message={`We have sent a link to confirm your email to ${sentEmail}`}
      />
    </Card>
  );
};
