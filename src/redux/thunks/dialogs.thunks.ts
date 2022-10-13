import { createAsyncThunk } from "@reduxjs/toolkit";
import { DialogsService } from "../../API/dialogs.service";
import { MessagesService } from "../../API/messages.service";
import { UsersService } from "../../API/users.service";
import { TCreateMessageArgs } from "../../types/args";
import { DialogActions } from "../types/dialogs.slice.types";

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

export const createMessage = createAsyncThunk(
  DialogActions.create_message,
  async (payload: TCreateMessageArgs, thunk) => {
    try {
      return await MessagesService.createMsg(payload);
    } catch (err: any) {
      return thunk.rejectWithValue(err.response?.data.message);
    }
  }
);

export const searchUsers = createAsyncThunk(
  DialogActions.search_users,
  async (searchQuery: string, thunk) => {
    try {
      return await UsersService.searchUsers(searchQuery);
    } catch (err: any) {
      return thunk.rejectWithValue(err.response?.data.message);
    }
  }
);
