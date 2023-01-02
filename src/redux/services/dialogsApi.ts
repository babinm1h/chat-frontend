import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { getAuthBaseQuery } from '.';
import { IDialog } from '../../types/entities';

export interface ICreateDialogResponse {
  dialog: IDialog;
  status: 'created' | 'exist';
}

const baseQuery = getAuthBaseQuery('dialogs');

export const dialogsApi = createApi({
  reducerPath: 'dialogsApi',
  baseQuery,
  endpoints: (builder) => ({
    createDialog: builder.mutation<ICreateDialogResponse, number>({
      query: (receiverId: number) => ({
        url: '/create',
        method: 'POST',
        body: { receiverId },
      }),
    }),
  }),
});

export const { useCreateDialogMutation } = dialogsApi;
