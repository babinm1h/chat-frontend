import { IDialog, IGroupDialog, IMessage, IUser } from '../../types/entities';

export interface IDialogsState {
  dialogsError: string;
  isDialogsFetching: boolean;
  dialogs: IDialog[];

  activeDialog: IDialog | null;
  activeDialogError: string;
  isActiveDialogFetching: boolean;
  editableMessage: null | IMessage;
  replyToMsg: null | IMessage;

  foundUsers: IUser[];
  isSearching: boolean;
  searchMode: boolean;

  groupDialogCreationFoundUsers: IUser[];
  groupDialogCreationIsSearching: boolean;
  groupDialogs: IGroupDialog[];
  activeGroupDialog: IGroupDialog | null;
  isGroupDialogsFetching: boolean;
}

export enum DialogActions {
  fetch_all = 'dialogs/fetch_all',
  fetch_current = 'dialogs/fetch_current',
  fetch_all_groups = 'dialogs/fetch_all_groups',
  fetch_current_group = 'dialogs/fetch_current_group',
  search_users = 'dialogs/search_users',
  groupDialog_search_users = 'dialogs/groupDialog_search_users',
}
