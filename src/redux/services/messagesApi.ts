import apiSlice from '.';
import { TUpdateMessageArgs } from '../../types/args';
import { IMessage } from '../../types/entities';

export const messagesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createMessage: builder.mutation<IMessage, FormData>({
      query: (payload) => ({
        url: 'messages/create',
        method: 'POST',
        body: payload,
      }),
    }),

    readMessage: builder.mutation<IMessage, number>({
      query: (id) => ({
        url: `messages/read/${id}`,
        method: 'PUT',
      }),
    }),

    deleteMessage: builder.mutation<IMessage, number>({
      query: (messageId) => ({
        url: `messages/delete/${messageId}`,
        method: 'DELETE',
      }),
    }),

    updateMessage: builder.mutation<IMessage, TUpdateMessageArgs>({
      query: ({ id, text }) => ({
        url: `messages/update/${id}`,
        method: 'PUT',
        body: { text },
      }),
    }),
  }),
});

export const { useCreateMessageMutation, useDeleteMessageMutation, useUpdateMessageMutation, useReadMessageMutation } =
  messagesApi;
