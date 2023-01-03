import apiSlice from '.';
import { IUser } from '../../types/entities';

export type TUpdateUserDto = Partial<IUser> | FormData;

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation<IUser, TUpdateUserDto>({
      query: (payload) => ({
        url: 'users/update',
        method: 'PUT',
        body: payload,
      }),
    }),
  }),
});

export const { useUpdateUserMutation } = usersApi;
