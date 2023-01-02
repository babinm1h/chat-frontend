import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { getAuthBaseQuery } from '.';
import { TUpdateMessageArgs } from '../../types/args';
import { IMessage } from '../../types/entities';

const baseQuery = getAuthBaseQuery('messages');

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery,
  endpoints: (builder) => ({
    createMessage: builder.mutation<IMessage, FormData>({
      query: (payload) => ({
        url: '/create',
        method: 'POST',
        body: payload,
      }),
    }),

    readMessage: builder.mutation<IMessage, number>({
      query: (id) => ({
        url: `/read/${id}`,
        method: 'PUT',
      }),
    }),

    deleteMessage: builder.mutation<IMessage, number>({
      query: (messageId) => ({
        url: `/delete/${messageId}`,
        method: 'DELETE',
      }),
    }),

    updateMessage: builder.mutation<IMessage, TUpdateMessageArgs>({
      query: ({ id, text }) => ({
        url: `/update/${id}`,
        method: 'PUT',
        body: { text },
      }),
    }),
  }),
});

export const { useCreateMessageMutation, useDeleteMessageMutation, useUpdateMessageMutation, useReadMessageMutation } =
  messagesApi;
