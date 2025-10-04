import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { AUTH_KEYS } from '../config/storage';

export const baseQuery = fetchBaseQuery({
  baseUrl: 'https://inctagram.work/api/v1',
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem(AUTH_KEYS.accessToken) : null;
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  }
});
