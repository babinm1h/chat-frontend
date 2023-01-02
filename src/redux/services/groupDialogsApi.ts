import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { getAuthBaseQuery } from '.';
import { TCreateGroupDialogArgs } from '../../types/args';
import { IGroupDialog } from '../../types/entities';

const baseQuery = getAuthBaseQuery('group-dialogs');

export const groupDialogsApi = createApi({
  tagTypes: ['fetchGroupDialogs'],
  reducerPath: 'groupDialogsApi',
  baseQuery,
  endpoints: (builder) => ({
    createGroupDialog: builder.mutation<IGroupDialog, TCreateGroupDialogArgs>({
      query: (payload) => ({
        url: '/create',
        method: 'POST',
        body: payload,
      }),
    }),

    fetchGroupDialogs: builder.query<IGroupDialog[], void>({
      providesTags: ['fetchGroupDialogs'],
      query: () => ({ url: '/', method: 'GET' }),
    }),
  }),
});

export const { useCreateGroupDialogMutation, useFetchGroupDialogsQuery } = groupDialogsApi;
