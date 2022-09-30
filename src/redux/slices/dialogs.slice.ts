import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDialog } from "../../types/entities";
import { fetchAllDialogs } from "../thunks/dialogs.thunks";
import { IDialogsState } from "../types/dialogs.slice.types";

const initialState: IDialogsState = {
  dialogs: {
    error: "",
    isFetching: true,
    items: [],
  },
};

const dialogsSlice = createSlice({
  initialState,
  name: "dialogs",
  reducers: {},
  extraReducers: {
    [fetchAllDialogs.fulfilled.type]: (state, action: PayloadAction<IDialog[]>) => {
      state.dialogs.isFetching = false;
      state.dialogs.error = "";
      state.dialogs.items = action.payload;
    },

    [fetchAllDialogs.pending.type]: (state, action) => {
      state.dialogs.isFetching = true;
    },

    [fetchAllDialogs.rejected.type]: (state, action: PayloadAction<string>) => {
      state.dialogs.isFetching = false;
      state.dialogs.error = action.payload;
    },
  },
});

export default dialogsSlice.reducer;
