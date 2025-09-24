import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { handleError } from '@/src/shared/lib/utils/handleError';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: 'https://inctagram.work/api/v1',
      prepareHeaders: () => {}
    })(args, api, extraOptions);

    // глобальная обработка ошибок
    handleError(api, result);

    return result;
  },
  endpoints: () => ({})
});
