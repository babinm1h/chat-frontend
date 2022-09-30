import { createAsyncThunk } from "@reduxjs/toolkit";
import { DialogsService } from "../../API/dialogs.service";
import { DialogActions } from "../types/dialogs.slice.types";

export const fetchAllDialogs = createAsyncThunk(DialogActions.fetch_all, async (_, thunk) => {
  try {
    return await DialogsService.getAll();
  } catch (err: any) {
    return thunk.rejectWithValue(err.response?.data.message);
  }
});
