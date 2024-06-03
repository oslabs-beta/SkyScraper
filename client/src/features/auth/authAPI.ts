import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
/**
 * Defines the API service for authentication.
 * 
 * @constant {Api} authApi - The API service created using `createApi`.
 */
export const authApi = createApi({
    /**
   * The key to store the API slice in the Redux store.
   * 
   * @type {string}
   */
  reducerPath: 'authApi',
    /**
   * The base query function that provides the base URL for all requests.
   * 
   * @type {BaseQueryFn}
   */
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
   /**
   * Defines the endpoints for the API service.
   * 
   * @param {EndpointBuilder} builder - The builder used to define endpoints.
   * @returns {Endpoints} The defined endpoints.
   */
  endpoints: (builder) => ({
    login: builder.query<{ token: string }, void>({
      query: () => '/login',
    }),
  }),
});

export const { useLoginQuery } = authApi;
