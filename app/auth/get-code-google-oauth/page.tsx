'use client';

import GetCodeGoogleOAuth from '@/src/features/auth/ui/GetCodeGoogleOAuth/GetCodeGoogleOAuth';
import { Suspense } from 'react';

const GetCodeGoogleOAuthPage = () => {
  return (
    <Suspense>
      <GetCodeGoogleOAuth />
    </Suspense>
  );
};

export default GetCodeGoogleOAuthPage;
