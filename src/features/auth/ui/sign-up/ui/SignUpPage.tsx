'use client';

import { SignUpForm } from '@/src/features/auth/ui/sign-up/ui/SignUpForm/SignUpForm';
import Card from '@/src/shared/ui/Card/Card';

import styles from './SignUpPage.module.scss';
import { OAuthButtons } from '@/src/features/auth/ui/sign-up/ui/OAuthButtons/OAuthButtons';
import { SignInPrompt } from '@/src/features/auth/ui/sign-up/ui/SignInPrompt/SignInPrompt';

export default function SignUpPage() {
  return (
    <Card className={styles.card}>
      <h1 className={styles.title}>Sign Up</h1>
      <OAuthButtons />
      <SignUpForm />
      <SignInPrompt />
    </Card>
  );
}
