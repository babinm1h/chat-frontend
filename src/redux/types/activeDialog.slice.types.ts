import { IDialog } from "../../types/entities";

export interface IActiveDialogState {
  activeDialog: IDialog | null;
  isFetching: boolean;
  error: string;
}

export enum ActiveDialogActions {
  fetch_active = "dialogs/fetch_active",
}
