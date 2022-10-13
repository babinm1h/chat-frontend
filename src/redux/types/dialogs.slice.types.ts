import { IDialog, IUser } from "../../types/entities";

export interface IDialogsState {
  dialogsError: string;
  isDialogsFetching: boolean;
  dialogs: IDialog[];

  activeDialog: IDialog | null;
  activeDialogError: string;
  isActiveDialogFetching: boolean;

  foundUsers: IUser[];
  isSearching: boolean;
  searchMode: boolean;
}

export enum DialogActions {
  fetch_all = "dialogs/fetch_all",
  fetch_current = "dialogs/fetch_current",
  create_message = "dialogs/create_message",
  search_users = "dialogs/search_users",
}
