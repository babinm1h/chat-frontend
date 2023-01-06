import { createAsyncThunk } from '@reduxjs/toolkit';
import { FriendsService } from '../../API/friends.service';
import { notifyError } from '../../utils/toast.helpers';
import { FriendsActions } from '../types/friends.slice.types';

export const fetchFriends = createAsyncThunk(FriendsActions.fetchFriends, async (_, thunk) => {
  try {
    const data = await FriendsService.fetchFriends();
    return data;
  } catch (err: any) {
    notifyError(err.response?.data.message);
    return thunk.rejectWithValue(err.response?.data.message);
  }
});

export const fetchRequests = createAsyncThunk(FriendsActions.fetchRequests, async (_, thunk) => {
  try {
    const data = await FriendsService.fetchRequests();
    return data;
  } catch (err: any) {
    notifyError(err.response?.data.message);
    return thunk.rejectWithValue(err.response?.data.message);
  }
});
