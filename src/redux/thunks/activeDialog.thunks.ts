import { createAsyncThunk } from "@reduxjs/toolkit";
import { DialogsService } from "../../API/dialogs.service";
import { ActiveDialogActions } from "../types/activeDialog.slice.types";

export const fetchDialogById = createAsyncThunk(ActiveDialogActions.fetch_active, async (id: number, thunk) => {
  try {
    return await DialogsService.getById(id);
  } catch (err: any) {
    return thunk.rejectWithValue(err.response?.data.message);
  }
});
