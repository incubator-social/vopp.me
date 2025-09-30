import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { handleError } from '@/src/shared/lib/utils/handleError';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: 'process.env.NEXT_PUBLIC_BASE_URL',
      prepareHeaders: () => {}
    })(args, api, extraOptions);

    handleError(api, result);

    return result;
  },
  endpoints: () => ({})
});
