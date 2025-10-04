'use client';

import { ForgotPasswordForm } from './ForgotPasswordForm';
import Card from '@/src/shared/ui/Card/Card';
import React, { useState } from 'react';
import { AlertModal } from '@/src/shared/ui/AlertModal';
import styles from './forgotPasswordPage.module.scss';

export const ForgotPasswordPage = () => {
  const [sentEmail, setSentEmail] = useState<string>('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <Card className={styles.wrapper}>
      <h1>Forgot Password</h1>
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
