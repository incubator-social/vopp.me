import { SignUpResponse } from '@/src/features/auth/api';
import { FetchBaseQueryMeta } from '@reduxjs/toolkit/query';

export const handleResponse = (
  result: unknown, // Type of data from baseQuery
  meta: FetchBaseQueryMeta
): SignUpResponse => {
  return { status: meta?.response?.status ?? 'no status' };
};
