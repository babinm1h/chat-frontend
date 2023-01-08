import { useEffect } from 'react';
import { socket } from '../../context/socketContext';
import {
  setIsReceivingCall,
  setMyStream,
  setCall,
  setRemoteStream,
  setIsCalling,
  setCallDialogId,
  setCallReceiver,
  setConnection,
  setIsWaitingForAnswer,
  resetCallState,
} from '../../redux/slices/call.slice';
import { IUser } from '../../types/entities';
import { SocketEvents, IAcceptVideoCallPayload, IRejectVideoCallPayload } from '../../types/socketEvents.types';
import { notifyWarn } from '../../utils/toast.helpers';
import { useAppDispatch } from '../useAppDispatch';
import { useAppSelector } from '../useAppSelector';

export const useCallEvents = (auth: IUser | null) => {
  const { peer, call, connection } = useAppSelector((state) => state.call);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!peer) return;
    peer.on('call', async (incCall) => {
      console.log('receiving call!!!');
      const constraints = { video: true, audio: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      dispatch(setIsReceivingCall(true));
      incCall.answer(stream);
      dispatch(setMyStream(stream));
      dispatch(setCall(incCall));
    });

    return () => {
      peer.off('call');
    };
  }, [peer]);

  useEffect(() => {
    if (!call) return;
    call.on('stream', (remoteStream) => dispatch(setRemoteStream(remoteStream)));
    call.on('close', () => console.log('call was closed'));
    return () => {
      call.off('stream');
      call.off('close');
    };
  }, [call]);

  useEffect(() => {
    if (!socket || !auth?.id) return;
    socket.on(SocketEvents.videoCallAccept, async (data: IAcceptVideoCallPayload) => {
      console.log(data, 'accept');
      dispatch(setIsCalling(false));
      dispatch(setCallDialogId(data.dialogId));
      if (!peer) return;
      if (data.receiverId === auth.id) {
        dispatch(setCallReceiver(auth));
      }
      if (data.callerId === auth.id) {
        const connection = peer.connect(`${data.receiverId}`);
        if (!connection) return;
        dispatch(setConnection(connection));

        const constraints = { video: true, audio: true };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        const newCall = peer.call(`${data.receiverId}`, stream);
        dispatch(setIsWaitingForAnswer(false));
        dispatch(setCall(newCall));
      }
    });
    return () => {
      socket.off(SocketEvents.videoCallAccept);
    };
  }, [socket, peer, auth?.id]);

  useEffect(() => {
    if (!call) return;
    call.on('stream', (remoteStream) => dispatch(setRemoteStream(remoteStream)));
    call.on('close', () => console.log('call was closed'));
    return () => {
      call.off('stream');
      call.off('close');
    };
  }, [call]);

  useEffect(() => {
    if (!socket || !auth?.id) return;

    socket.on(SocketEvents.videoCallReject, (data: IRejectVideoCallPayload) => {
      dispatch(resetCallState());
      console.log(data, 'rej');
      if (data.caller.id === auth.id) {
        notifyWarn(`Call rejected`);
      }
    });

    return () => {
      socket.off(SocketEvents.videoCallReject);
    };
  }, [socket, call, auth?.id]);

  useEffect(() => {
    if (!socket) return;

    socket.on(SocketEvents.videoCallHangup, (data: IRejectVideoCallPayload) => {
      dispatch(resetCallState());
      call && call.close();
      connection && connection.close();
    });

    return () => {
      socket.off(SocketEvents.videoCallHangup);
    };
  }, [socket, call, connection]);
};
