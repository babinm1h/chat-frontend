import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { TCreateMessageArgs, TUpdateMessageArgs } from "../../types/args";
import { IMessage } from "../../types/entities";
import { getTokenCookie } from "../../utils/cookie.helpers";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:7777/messages",
  credentials: "include",
  prepareHeaders: (headers, api) => {
    const token = getTokenCookie();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const messagesApi = createApi({
  reducerPath: "messagesApi",
  baseQuery,
  endpoints: (builder) => ({
    createMessage: builder.mutation<IMessage, TCreateMessageArgs>({
      query: (payload) => ({
        url: "/create",
        method: "POST",
        body: payload,
      }),
    }),

    deleteMessage: builder.mutation<IMessage, number>({
      query: (messageId) => ({
        url: `/delete/${messageId}`,
        method: "DELETE",
      }),
    }),

    updateMessage: builder.mutation<IMessage, TUpdateMessageArgs>({
      query: ({ id, text }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body: { text },
      }),
    }),
  }),
});

export const { useCreateMessageMutation, useDeleteMessageMutation, useUpdateMessageMutation } = messagesApi;
