'use client';

import { useGoogleOAuthLoginMutation } from '@/src/features/auth/api';
import { useEffect, useState } from 'react';

type SearchParams = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const GetTokenGoogleComponent = ({ searchParams }: SearchParams) => {
  const [params, setParams] = useState<{ [key: string]: string | string[] | undefined } | null>(null);
  const [code, setCode] = useState<string | null>(null);

  const [googleLogin] = useGoogleOAuthLoginMutation();

  useEffect(() => {
    const fetchSearchParams = async () => {
      try {
        const data = await searchParams;
        setParams(data);
      } catch (error) {
        console.error('Failed fetch searchParams: ', error);
      }
    };
    fetchSearchParams();
  }, [searchParams]);

  useEffect(() => {
    if (params?.code) {
      setCode(params.code as string);
    }
  }, [params]);

  useEffect(() => {
    if (code) {
      googleLogin({ code });
    }
  }, [code, googleLogin]);

  return null;
};

export default GetTokenGoogleComponent;
