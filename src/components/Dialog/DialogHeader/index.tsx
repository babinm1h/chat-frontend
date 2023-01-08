import Peer from 'peerjs';
import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { VideoIcon } from '../../../assets/icons';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useSocket } from '../../../hooks/useSocket';
import {
  setCaller,
  setCallReceiver,
  setConnection,
  setIsWaitingForAnswer,
  setMyStream,
  setRemoteStream,
} from '../../../redux/slices/call.slice';
import { IUser } from '../../../types/entities';
import { SocketEvents } from '../../../types/socketEvents.types';
import DotsLoader from '../../UI/DotsLoader';
import UserAvatar from '../../UserAvatar';

const StHeader = styled.header`
  display: flex;
  background-color: ${({ theme }) => theme.currentTheme.background.secondary};
  padding: 10px 20px;
  width: 100%;
  align-items: center;
  gap: 15px;
`;

const StReceiver = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StLastOnline = styled.div`
  color: ${({ theme }) => theme.currentTheme.text.secondary};
`;

const StMobile = styled.div`
  color: ${({ theme }) => theme.currentTheme.text.primary};
`;

const StTyping = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

interface IProps {
  receiver: IUser;
  typingUser?: string;
  peer: Peer | null;
  authUser: IUser | null;
}

const DialogHeader: FC<IProps> = ({ receiver, typingUser, peer, authUser }) => {
  const dispatch = useAppDispatch();
  const socket = useSocket();
  const { call } = useAppSelector((state) => state.call);
  const dialogId = useAppSelector((state) => state.dialogs.activeDialog?.id);

  const handleCall = async () => {
    if (peer) {
      const receiverPeerId = `${receiver.id}`;
      const connectionPeer = peer.connect(receiverPeerId);
      dispatch(setConnection(connectionPeer));
      const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });

      socket.emit(SocketEvents.onVideoCallInit, { receiverId: receiver.id, dialogId });
      dispatch(setMyStream(mediaStream));
      dispatch(setCallReceiver(receiver));
      dispatch(setCaller(authUser));
      dispatch(setIsWaitingForAnswer(true));
    }
  };

  useEffect(() => {
    if (call) {
      call.on('stream', (remStream) => {
        console.log('remStream', remStream);
        dispatch(setRemoteStream(remStream));
      });
    }
    return () => {
      call?.off('stream');
    };
  }, [call]);

  return (
    <StHeader>
      <UserAvatar size="small" fakeSize="32px" user={receiver} />
      <StReceiver>
        <StMobile>{receiver.firstName}</StMobile>
        <StLastOnline>
          {typingUser ? (
            <StTyping>
              <DotsLoader />
              <p>{typingUser} is typing</p>
            </StTyping>
          ) : (
            `last seen 7 min ago`
          )}
        </StLastOnline>
      </StReceiver>
      <button onClick={handleCall}>
        <VideoIcon size={22} />
      </button>
    </StHeader>
  );
};

export default DialogHeader;
