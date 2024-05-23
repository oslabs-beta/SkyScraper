import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  endpoints: (builder) => ({
    login: builder.query<{ token: string }, void>({
      query: () => '/login',
    }),
  }),
});

export const { useLoginQuery } = authApi;
