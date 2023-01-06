import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FriendRequestStatus, IFriendRequest } from '../../types/entities';
import { fetchFriends, fetchRequests } from '../thunks/friends.thunks';
import { IFriendsState } from '../types/friends.slice.types';

const initialState: IFriendsState = {
  friends: [],
  isFriendsLoading: true,
  isRequestsLoading: true,
  requests: [],
};

const friendsSlice = createSlice({
  initialState,
  name: 'friends',
  reducers: {
    acceptRequest(state, action: PayloadAction<number>) {
      const req = state.requests.find((req) => req.id === action.payload);
      if (req) {
        req.status = FriendRequestStatus.accepted;
      }
    },
    rejectRequest(state, action: PayloadAction<number>) {
      const req = state.requests.find((req) => req.id === action.payload);
      if (req) {
        req.status = FriendRequestStatus.rejected;
      }
    },

    deleteFriend(state, action: PayloadAction<number>) {
      state.friends = state.friends.filter((fr) => fr.id !== action.payload);
    },

    addRequest(state, action: PayloadAction<IFriendRequest>) {
      state.requests.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFriends.fulfilled, (state, action) => {
      state.friends = action.payload;
      state.isFriendsLoading = false;
    });

    builder.addCase(fetchFriends.pending, (state) => {
      state.isFriendsLoading = true;
    });

    builder.addCase(fetchFriends.rejected, (state) => {
      state.isFriendsLoading = false;
    });

    builder.addCase(fetchRequests.fulfilled, (state, action) => {
      state.requests = action.payload;
      state.isRequestsLoading = false;
    });

    builder.addCase(fetchRequests.pending, (state) => {
      state.isRequestsLoading = true;
    });

    builder.addCase(fetchRequests.rejected, (state) => {
      state.isRequestsLoading = false;
    });
  },
});

export const { acceptRequest, rejectRequest, deleteFriend, addRequest } = friendsSlice.actions;
export default friendsSlice.reducer;
