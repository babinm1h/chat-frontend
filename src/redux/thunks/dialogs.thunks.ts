import { createAsyncThunk } from '@reduxjs/toolkit';
import { DialogsService } from '../../API/dialogs.service';
import { UsersService } from '../../API/users.service';
import { DialogActions } from '../types/dialogs.slice.types';

export const fetchAllDialogs = createAsyncThunk(DialogActions.fetch_all, async (_, thunk) => {
  try {
    return await DialogsService.getAll();
  } catch (err: any) {
    return thunk.rejectWithValue(err.response?.data.message);
  }
});

export const fetchDialogById = createAsyncThunk(DialogActions.fetch_current, async (id: number, thunk) => {
  try {
    return await DialogsService.getById(id);
  } catch (err: any) {
    return thunk.rejectWithValue(err.response?.data.message);
  }
});

export const searchUsers = createAsyncThunk(DialogActions.search_users, async (searchQuery: string, thunk) => {
  try {
    return await UsersService.searchUsers(searchQuery);
  } catch (err: any) {
    return thunk.rejectWithValue(err.response?.data.message);
  }
});

export const groupDialogCreationSearchUsers = createAsyncThunk(
  DialogActions.groupDialog_search_users,
  async (searchQuery: string, thunk) => {
    try {
      return await UsersService.searchUsers(searchQuery);
    } catch (err: any) {
      return thunk.rejectWithValue(err.response?.data.message);
    }
  },
);

export const fetchAllGroupDialogs = createAsyncThunk(DialogActions.fetch_all_groups, async (_, thunk) => {
  try {
    return await DialogsService.getAllGroupDialogs();
  } catch (err: any) {
    return thunk.rejectWithValue(err.response?.data.message);
  }
});

export const fetchGroupDialogById = createAsyncThunk(DialogActions.fetch_current_group, async (id: number, thunk) => {
  try {
    return await DialogsService.getGroupDialogById(id);
  } catch (err: any) {
    return thunk.rejectWithValue(err.response?.data.message);
  }
});
