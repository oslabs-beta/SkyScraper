import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../app/store';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/',
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token: string | null = state.rootReducer.auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getEC2: builder.query<{ token: string }, string>({
      query: () => 'ec2',
    }),
    getStats: builder.query<{ token: string }, string>({
      query: () => 'stats',
    }),
  }),
});

export const { useGetEC2Query, useGetStatsQuery } = authApi;
