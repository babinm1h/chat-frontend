import { IFriendRequest, IFriend } from '../../types/entities';

export interface IFriendsState {
  friends: IFriend[];
  isFriendsLoading: boolean;

  requests: IFriendRequest[];
  isRequestsLoading: boolean;
}

export enum FriendsActions {
  fetchFriends = 'friends/fetchFriends',
  fetchRequests = 'friends/fetchRequests',
}
