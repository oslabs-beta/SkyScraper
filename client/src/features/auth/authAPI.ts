import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../app/store';
import { EC2Instance } from '../../app/types';

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
    getEC2: builder.query<EC2Instance[], undefined>({
      query: (_ignoredParam) => 'ec2',
    }),
    getStats: builder.query<undefined, undefined>({
      query: (_ignoredParam) => 'stats',
    }),
  }),
});

export const { useGetEC2Query, useGetStatsQuery } = authApi;
