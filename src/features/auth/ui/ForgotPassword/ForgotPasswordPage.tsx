'use client';
import { ForgotPasswordForm } from '@/src/features/auth/ui/ForgotPassword/ForgetPasswordForm/ForgotPasswordForm';
import Card from '@/src/shared/ui/Card/Card';
import { useState } from 'react';

type Step = 'email' | 'reset' | 'expired';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>('email');

  return (
    <>
      {step === 'email' && (
        <Card>
          <ForgotPasswordForm onSuccess={() => setStep('reset')} />
        </Card>
      )}
      {step === 'reset' && 'ResetPasswordForm'}
      {step === 'expired' && 'LinkExpired'}
    </>
  );
}
