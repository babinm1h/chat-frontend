import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDialog, IMessage, IUser } from "../../types/entities";
import { fetchAllDialogs, fetchDialogById, searchUsers } from "../thunks/dialogs.thunks";
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
  editableMessage: null,
  messageContextMenuIsOpen: false,
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
      if (state.activeDialog?.id === action.payload.dialogId) {
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
    deleteMessage(state, action: PayloadAction<IMessage>) {
      const dialog = state.dialogs.find((d) => d.id === action.payload.dialogId);
      if (dialog) {
        dialog.messages = dialog.messages.filter((m) => m.id !== action.payload.id);
        if (state.activeDialog?.id === action.payload.dialogId) {
          state.activeDialog.messages = state.activeDialog.messages.filter((m) => m.id !== action.payload.id);
          if (dialog?.lastMessage?.id === action.payload.id) {
            dialog.lastMessage = dialog.messages[dialog.messages.length - 1];
          }
        }
      }
    },
    updateMessage(state, action: PayloadAction<IMessage>) {
      const dialog = state.dialogs.find((d) => d.id === action.payload.dialogId);
      if (dialog) {
        const msg = dialog.messages.find((m) => m.id === action.payload.id);
        if (msg) msg.text = action.payload.text;
        if (state.activeDialog?.id === action.payload.dialogId) {
          const activeDialogMsg = state.activeDialog.messages.find((m) => m.id === action.payload.id);
          if (activeDialogMsg) activeDialogMsg.text = action.payload.text;
        }
        if (dialog.lastMessage?.id === action.payload.id) {
          dialog.lastMessage = action.payload;
        }
      }
    },
    setEditableMessage(state, action: PayloadAction<null | IMessage>) {
      state.editableMessage = action.payload;
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
    setMessageContextMenuIsOpen(state, action: PayloadAction<boolean>) {
      state.messageContextMenuIsOpen = action.payload;
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
export const {
  addMessage,
  setSearchMode,
  addDialog,
  deleteMessage,
  setEditableMessage,
  setDialogs,
  updateMessage,
  setMessageContextMenuIsOpen,
} = dialogsSlice.actions;
