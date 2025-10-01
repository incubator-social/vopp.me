import { Suspense } from 'react';
import { CreateNewPasswordForm } from '@/src/features/auth/ui/reset-confirm/CreateNewPassword/CreateNewPasswordForm';

export default function Page() {
  return <CreateNewPasswordForm />;
}

export default function Page({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  return (
    <Suspense>
      <CreateNewPasswordForm searchParams={searchParams} />
    </Suspense>
  );
}
