'use client';
import { EmailSentModal } from '@/src/features/auth/ui/EmailSentModal';
import { OAuthButtons } from '@/src/features/auth/ui/SignUp/OAuthButtons';
import { SignInPrompt } from '@/src/features/auth/ui/SignUp/SignInPrompt';
import { SignUpForm } from '@/src/features/auth/ui/SignUp/SignUpForm';
import { useState } from 'react';
import Card from '@/src/shared/ui/Card/Card';
import styles from './SignUp.module.scss';

export type ModalDataSignUp = {
  open: boolean;
  email: string | undefined;
};

export default function SignUp() {
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
