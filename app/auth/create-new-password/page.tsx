import { Suspense } from 'react';
import { CreateNewPasswordForm } from '@/src/features/auth/ui/ForgotPassword/CreateNewPassword/CreateNewPasswordForm';

export default function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  return (
    <Suspense>
      <CreateNewPasswordForm searchParams={searchParams} />
    </Suspense>
  );
}
