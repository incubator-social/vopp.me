import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://inctagram.work/api/v1/',
    prepareHeaders: () => {}
  }),
  endpoints: () => ({}),
  tagTypes: ['registration']
});
