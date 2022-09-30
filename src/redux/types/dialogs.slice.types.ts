import { IDialog } from "../../types/entities";
import { IStateSection } from "../../types/state.types";

export interface IDialogsState {
  dialogs: IStateSection<IDialog[]>;
}

export enum DialogActions {
  fetch_all = "dialogs/fetch_all",
  fetch_one = "dialogs/fetch_one",
}
