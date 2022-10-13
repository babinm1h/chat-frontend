import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDialog, IMessage, IUser } from "../../types/entities";
import { createMessage, fetchAllDialogs, fetchDialogById, searchUsers } from "../thunks/dialogs.thunks";
import { IDialogsState } from "../types/dialogs.slice.types";

const initialState: IDialogsState = {
  // все диалоги
  dialogsError: "",
  isDialogsFetching: true,
  dialogs: [],
  // выбранный диалог
  activeDialog: null,
  activeDialogError: "",
  isActiveDialogFetching: true,
  // поиск пользователей / диалогов
  foundUsers: [],
  isSearching: false,
  searchMode: false,
};

const dialogsSlice = createSlice({
  initialState,
  name: "dialogs",
  reducers: {
    addMessage(state, action: PayloadAction<IMessage>) {
      const dialog = state.dialogs.find((d) => d.id === action.payload.dialogId);
      if (action.payload.dialogId === state.activeDialog?.id) {
        state.activeDialog.messages.push(action.payload);
      }
      if (dialog) {
        dialog.messages.push(action.payload);
        dialog.lastMessage = action.payload;
        const updatedIdx = state.dialogs.findIndex((d) => d.id === action.payload.dialogId);
        state.dialogs.splice(updatedIdx, 1);
        state.dialogs = [dialog, ...state.dialogs];
      }
    },
    setSearchMode(state, action: PayloadAction<boolean>) {
      state.searchMode = action.payload;
    },
    setDialogs(state, action: PayloadAction<IDialog[]>) {
      state.dialogs = action.payload;
    },
    addDialog(state, action: PayloadAction<IDialog>) {
      if (!state.dialogs.find((d) => d.id === action.payload.id)) state.dialogs.push(action.payload);
    },
  },
  extraReducers: {
    // Получить список диалогов
    [fetchAllDialogs.fulfilled.type]: (state, action: PayloadAction<IDialog[]>) => {
      state.isDialogsFetching = false;
      state.dialogsError = "";
      state.dialogs = action.payload;
    },

    [fetchAllDialogs.pending.type]: (state, action) => {
      state.isDialogsFetching = true;
    },

    [fetchAllDialogs.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isDialogsFetching = false;
      state.dialogsError = action.payload;
    },

    // Получить выбранный диалог
    [fetchDialogById.fulfilled.type]: (state, action: PayloadAction<IDialog>) => {
      state.activeDialog = action.payload;
      state.activeDialogError = "";
      state.isActiveDialogFetching = false;
    },

    [fetchDialogById.pending.type]: (state) => {
      state.isActiveDialogFetching = true;
    },

    [fetchDialogById.rejected.type]: (state, action: PayloadAction<string>) => {
      state.activeDialogError = action.payload;
      state.isActiveDialogFetching = true;
    },

    // Oтправить сообщение
    [createMessage.fulfilled.type]: (state, action: PayloadAction<IMessage>) => {},
    [createMessage.pending.type]: (state, action: PayloadAction<IMessage>) => {},
    [createMessage.rejected.type]: (state, action: PayloadAction<IMessage>) => {},

    // Поиск юзеров
    [searchUsers.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
      state.foundUsers = action.payload;
      state.isSearching = false;
    },

    [searchUsers.pending.type]: (state) => {
      state.isSearching = true;
    },

    [searchUsers.rejected.type]: (state, action) => {
      state.isSearching = false;
    },
  },
});

export default dialogsSlice.reducer;
export const { addMessage, setSearchMode, addDialog } = dialogsSlice.actions;
