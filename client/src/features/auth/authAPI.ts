import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../app/store';
import { EC2Instance, EC2Stats } from '../../app/types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://skyscraper-api.com/api/',
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const { access_token, id_token } = state.rootReducer.auth.tokens;
      if (access_token) {
        headers.set('Authorization', `Bearer ${access_token}`);
      }
      if (id_token) {
        headers.set('id-token', id_token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getEC2: builder.query<EC2Instance[], undefined>({
      query: (_ignoredParam) => 'ec2',
    }),
    getStats: builder.query<EC2Stats, undefined>({
      query: (_ignoredParam) => 'stats',
    }),
  }),
});

export const { useGetEC2Query, useGetStatsQuery } = authApi;
