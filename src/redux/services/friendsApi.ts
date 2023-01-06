import apiSlice from '.';
import { IFriendRequest, IUser } from '../../types/entities';

export type TUpdateUserDto = Partial<IUser> | FormData;

export const friendsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFriends: builder.query<IUser[], void>({
      query: () => ({
        url: 'friends/get-my',
      }),
    }),

    getRequests: builder.query<IFriendRequest[], void>({
      query: () => ({
        url: 'friends/get-requests',
      }),
    }),

    acceptReq: builder.mutation<IFriendRequest, number>({
      query: (id) => ({
        url: `friends/accept/${id}`,
        method: 'PUT',
      }),
    }),

    rejectReq: builder.mutation<IFriendRequest, number>({
      query: (id) => ({
        url: `friends/reject/${id}`,
        method: 'PUT',
      }),
    }),

    createReq: builder.mutation<IFriendRequest, number>({
      query: (id) => ({
        url: `friends/create-request/${id}`,
        method: 'POST',
      }),
    }),

    deleteFriend: builder.mutation<IUser, number>({
      query: (id) => ({
        url: `friends/delete/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetFriendsQuery,
  useGetRequestsQuery,
  useLazyGetFriendsQuery,
  useLazyGetRequestsQuery,

  useCreateReqMutation,
  useRejectReqMutation,
  useAcceptReqMutation,
  useDeleteFriendMutation,
} = friendsApi;
