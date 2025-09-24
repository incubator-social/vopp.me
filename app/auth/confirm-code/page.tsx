import ConfirmCodeClient from '@/app/auth/confirm-code/ConfirmCodeClient';
import React from 'react';

export default async function Page({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const code = params?.code || undefined;

  if (!code) return <h1>No code</h1>;

  return <ConfirmCodeClient code={code} />;
}
