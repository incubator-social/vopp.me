'use client';
import { EmailSentModal } from '@/src/features/auth/ui/email-sent-modal';
import { useState } from 'react';
import Card from '@/src/shared/ui/Card/Card';
import styles from './page.module.scss';
import { OAuthButtons } from '@/src/features/auth/ui/sign-up/OAuthButtons/OAuthButtons';
import { SignUpForm } from '@/src/features/auth/ui/sign-up/SignUpForm/SignUpForm';
import { SignInPrompt } from '@/src/features/auth/ui/sign-up/SignInPrompt/SignInPrompt';

export default function SignUpPage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <Card className={styles.card}>
      <h1 className={styles.title}>Sign Up</h1>
      <OAuthButtons />
      <SignUpForm onOpenModal={setIsModalOpen} />
      <SignInPrompt />
      {isModalOpen && (
        <EmailSentModal open={isModalOpen} onOpenChange={setIsModalOpen} classOverlay={styles.classOverlay} />
      )}
    </Card>
  );
}
