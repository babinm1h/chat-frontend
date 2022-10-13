import { $authInstance } from ".";
import { IDialog } from "../types/entities";

export class DialogsService {
  static async getAll(): Promise<IDialog[]> {
    const { data } = await $authInstance.get<IDialog[]>("/dialogs");
    return data;
  }

  static async getById(id: number): Promise<IDialog> {
    const { data } = await $authInstance.get<IDialog>(`/dialogs/get/${id}`);
    return data;
  }
}
