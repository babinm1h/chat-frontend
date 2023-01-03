import apiSlice from '.';
import { TCreateGroupDialogArgs } from '../../types/args';
import { IGroupDialog } from '../../types/entities';

export const groupDialogsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createGroupDialog: builder.mutation<IGroupDialog, TCreateGroupDialogArgs>({
      query: (payload) => ({
        url: 'group-dialogs/create',
        method: 'POST',
        body: payload,
      }),
    }),

    fetchGroupDialogs: builder.query<IGroupDialog[], void>({
      query: () => ({ url: 'group-dialogs/', method: 'GET' }),
    }),
  }),
});

export const { useCreateGroupDialogMutation, useFetchGroupDialogsQuery } = groupDialogsApi;
