'use client';
import { EmailSentModal } from '@/src/features/auth/ui/email-sent-modal';
import { useState } from 'react';
import Card from '@/src/shared/ui/Card/Card';
import styles from './SignUpPage.module.scss';
import { OAuthButtons } from '@/src/features/auth/ui/sign-up/OAuthButtons/OAuthButtons';
import { SignUpForm } from '@/src/features/auth/ui/sign-up/SignUpForm/SignUpForm';
import { SignInPrompt } from '@/src/features/auth/ui/sign-up/SignInPrompt/SignInPrompt';

export type ModalDataSignUp = {
  open: boolean;
  email: string | undefined;
};

export default function SignUpPage() {
  const [modal, setModal] = useState<ModalDataSignUp>({ open: false, email: '' });

  return (
    <Card className={styles.card}>
      <h1 className={styles.title}>Sign Up</h1>
      <OAuthButtons />
      <SignUpForm onModalChange={setModal} />
      <SignInPrompt />
      {modal.open && (
        <EmailSentModal
          open={modal.open}
          email={modal.email}
          onOpenChange={(open) => setModal({ open, email: modal.email })}
          classOverlay={styles.classOverlay}
        />
      )}
    </Card>
  );
}
