import { baseApi } from '../../../shared/api/baseApi';

export const authApi = baseApi.injectEndpoints({
  reducerPath: 'authApi',
  endpoints: (build) => ({
    registration: build.mutation({
      query: (userData) => ({
        url: 'auth/registration',
        method: 'POST',
        body: userData
      }),
      transformResponse: (_result, meta) => {
        return { status: meta?.response?.status ?? 0 };
      },
      invalidatesTags: ['registration']
    })
  })
});

export const { useRegistrationMutation } = authApi;
