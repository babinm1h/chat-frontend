import { $authInstance } from '.';
import { IDialog, IGroupDialog } from '../types/entities';

export class DialogsService {
  static async getAll(): Promise<IDialog[]> {
    const { data } = await $authInstance.get<IDialog[]>('/dialogs');
    return data;
  }

  static async getById(id: number): Promise<IDialog> {
    const { data } = await $authInstance.get<IDialog>(`/dialogs/get/${id}`);
    return data;
  }

  static async getAllGroupDialogs(): Promise<IGroupDialog[]> {
    const { data } = await $authInstance.get<IGroupDialog[]>('/group-dialogs');
    return data;
  }

  static async getGroupDialogById(id: number): Promise<IGroupDialog> {
    const { data } = await $authInstance.get<IGroupDialog>(`/group-dialogs/${id}`);
    return data;
  }
}
