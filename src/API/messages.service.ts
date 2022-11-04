import { $authInstance } from ".";
import { TCreateMessageArgs } from "../types/args";
import { IMessage } from "../types/entities";

export class MessagesService {
  static async createMsg(payload: TCreateMessageArgs): Promise<IMessage> {
    const { data } = await $authInstance.post<IMessage>("/messages/create", payload);
    return data;
  }

  static async delete(id: number): Promise<IMessage> {
    const { data } = await $authInstance.post<IMessage>(`/messages/delete/${id}`);
    return data;
  }

  static async update(payload: TCreateMessageArgs): Promise<IMessage> {
    const { data } = await $authInstance.post<IMessage>("/messages/update", payload);
    return data;
  }
}
