import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithRefresh } from './baseQueryWithRefresh';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Auth', 'Posts'],
  baseQuery: baseQueryWithRefresh,
  endpoints: () => ({})
});
