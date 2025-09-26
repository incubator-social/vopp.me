import ConfirmCodePage from '@/src/features/auth/ui/ConfirmCodePage/ConfirmCodePage';
import { Suspense } from 'react';

export default async function Page({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <Suspense>
      <ConfirmCodePage searchParams={searchParams} />
    </Suspense>
  );
}
