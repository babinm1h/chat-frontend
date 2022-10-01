import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDialog } from "../../types/entities";
import { fetchDialogById } from "../thunks/activeDialog.thunks";
import { IActiveDialogState } from "../types/activeDialog.slice.types";

const initialState: IActiveDialogState = {
  activeDialog: null,
  error: "",
  isFetching: true,
};

const activeDialogSlice = createSlice({
  initialState,
  name: "activeDialog",
  reducers: {},
  extraReducers: {
    [fetchDialogById.fulfilled.type]: (state, action: PayloadAction<IDialog>) => {
      state.activeDialog = action.payload;
      state.error = "";
      state.isFetching = false;
    },

    [fetchDialogById.pending.type]: (state) => {
      state.isFetching = true;
    },

    [fetchDialogById.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isFetching = false;
    },
  },
});

export default activeDialogSlice.reducer;
