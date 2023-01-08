import Peer, { DataConnection, MediaConnection } from 'peerjs';
import { IUser } from '../../types/entities';

export interface ICallState {
  peer: Peer | null;
  isCalling: boolean;
  myStream: null | MediaStream;
  remoteStream: null | MediaStream;
  call: MediaConnection | null;
  connection: null | DataConnection;
  isReceivingCall: boolean;
  caller: IUser | null;
  receiver: IUser | null;
  callDialogId: number | null;
  isWaitingForAnswer: boolean;
}
