import { $authInstance } from ".";

export class DialogsService {
  static async getAll() {
    const { data } = await $authInstance.get("/dialogs");
    return data;
  }

  static async getOne(id: number) {
    const { data } = await $authInstance.get(`/dialogs/${id}`);
    return data;
  }

  static async create(receiverId: number) {}
}
