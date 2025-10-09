import { ConfirmCode } from '@/src/features/auth/ui/ConfirmCode';
import { Suspense } from 'react';

export default async function ConfirmCodePage({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  debugger;
  return (
    <Suspense>
      <ConfirmCode searchParams={searchParams} />
    </Suspense>
  );
}
