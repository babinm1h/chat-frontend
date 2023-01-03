import apiSlice from '.';
import { IDialog } from '../../types/entities';

export interface ICreateDialogResponse {
  dialog: IDialog;
  status: 'created' | 'exist';
}

export const dialogsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createDialog: builder.mutation<ICreateDialogResponse, number>({
      query: (receiverId: number) => ({
        url: 'dialogs/create',
        method: 'POST',
        body: { receiverId },
      }),
    }),
  }),
});

export const { useCreateDialogMutation } = dialogsApi;
