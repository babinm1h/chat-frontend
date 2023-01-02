import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { getTokenCookie } from '../../utils/cookie.helpers';

export const getAuthBaseQuery = (endpoint: string) => {
  return fetchBaseQuery({
    baseUrl: `http://localhost:7777/${endpoint}`,
    credentials: 'omit',
    prepareHeaders: (headers, api) => {
      const token = getTokenCookie();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });
};
