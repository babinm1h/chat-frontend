import { IUser } from "./entities";

export enum SocketEvents {
  createMsg = 'message:create',
  deleteMsg = 'message:delete',
  receiveMsg = 'message:receive',
  updateMsg = 'message:update',
  readMsg = 'message:read',

  userStartTyping = 'user:startTyping',
  userStopTyping = 'user:stopTyping',

  joinRoom = 'room:join',
  leaveRoom = 'room:leave',

  createDialog = 'dialog:create',
  deleteDialog = 'dialog:delete',

  disconnect = 'disconnect',
  connect = 'connect',

  createFriendReq = 'createFriendReq',
  receiveFriendReq = 'receiveFriendReq',

  onVideoCallInit = 'onVideoCallInit',
  videoCallAccept = 'VideoCallAccept',
  videoCallReject = 'VideoCallReject',
  videoCallHangup = 'VideoCallHangup',
}

export interface IAcceptVideoCallPayload {
  receiverId: number;
  callerId: number;
  dialogId: number;
}

export interface IRejectVideoCallPayload {
  receiverId: number;
  caller: IUser;
  dialogId: number;
}
