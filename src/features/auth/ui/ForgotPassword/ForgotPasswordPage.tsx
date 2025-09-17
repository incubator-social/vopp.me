'use client';
import { ForgotPasswordForm } from '@/src/features/auth/ui/ForgotPassword/ForgotPasswordForm';
import Card from '@/src/shared/ui/Card/Card';
import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<'email' | 'reset' | 'expired'>('email');

  return (
    <Card>
      {step === 'email' && <ForgotPasswordForm onSuccess={() => setStep('reset')} />}
      {step === 'reset' && 'ResetPasswordForm'}
      {step === 'expired' && 'LinkExpired'}
    </Card>
  );
}
