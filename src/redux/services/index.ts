import { fetchBaseQuery } from '@reduxjs/toolkit/query';
// !!!
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { getTokenCookie } from '../../utils/cookie.helpers';

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  credentials: 'include',
  prepareHeaders: (headers, api) => {
    const token = getTokenCookie();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const apiSlice = createApi({
  baseQuery: baseQuery,
  endpoints: (builder) => ({}),
});

export default apiSlice;
