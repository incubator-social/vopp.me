'use client';

import GetTokenGithubOAuth from '@/src/features/auth/ui/GetTokenGithubOAuth/GetTokenGithubOAuth';
import { Suspense } from 'react';

const GetTokenGithubOAuthPage = () => {
  return (
    <Suspense>
      <GetTokenGithubOAuth />
    </Suspense>
  );
};

export default GetTokenGithubOAuthPage;
