import { baseApi } from '@/src/shared/api/baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    isAuth: builder.query({
      query: () => ''
    })
  })
});
