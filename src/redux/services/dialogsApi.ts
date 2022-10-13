import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IDialog } from "../../types/entities";
import { getTokenCookie } from "../../utils/cookie.helpers";

export interface ICreateDialogResponse {
  dialog: IDialog;
  status: "created" | "exist";
}

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:7777/dialogs",
  credentials: "include",
  prepareHeaders: (headers, api) => {
    const token = getTokenCookie();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const dialogsApi = createApi({
  reducerPath: "dialogsApi",
  baseQuery,
  endpoints: (builder) => ({
    createDialog: builder.mutation<ICreateDialogResponse, number>({
      query: (receiverId: number) => ({
        url: "/create",
        method: "POST",
        body: { receiverId },
      }),
    }),
  }),
});

export const { useCreateDialogMutation } = dialogsApi;
