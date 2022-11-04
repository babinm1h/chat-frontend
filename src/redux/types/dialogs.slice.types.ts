import { IDialog, IMessage, IUser } from "../../types/entities";

export interface IDialogsState {
  dialogsError: string;
  isDialogsFetching: boolean;
  dialogs: IDialog[];

  activeDialog: IDialog | null;
  activeDialogError: string;
  isActiveDialogFetching: boolean;
  editableMessage: null | IMessage;
  messageContextMenuIsOpen: boolean;

  foundUsers: IUser[];
  isSearching: boolean;
  searchMode: boolean;
}

export enum DialogActions {
  fetch_all = "dialogs/fetch_all",
  fetch_current = "dialogs/fetch_current",
  search_users = "dialogs/search_users",
}
