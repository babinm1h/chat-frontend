import { $authInstance } from '.';
import { IFriend, IFriendRequest } from '../types/entities';

export class FriendsService {
  static async fetchFriends() {
    const { data } = await $authInstance.get<IFriend[]>('/friends/get-my');
    return data;
  }

  static async fetchRequests() {
    const { data } = await $authInstance.get<IFriendRequest[]>('friends/get-requests');
    return data;
  }
}
