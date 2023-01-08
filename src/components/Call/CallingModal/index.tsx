import React from 'react';
import styled from 'styled-components';
import { PhoneDownIcon, PhoneIcon } from '../../../assets/icons';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useSocket } from '../../../hooks/useSocket';
import { SocketEvents } from '../../../types/socketEvents.types';
import Modal from '../../UI/Modal';
import UserAvatar from '../../UserAvatar';

const StWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const StName = styled.div`
  font-weight: 500;
  font-size: 1.2rem;
`;

const StActions = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const StAcceptBtn = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: lime;
  svg {
    color: #fff;
  }
`;

const StRejectBtn = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: red;
  svg {
    color: #fff;
  }
`;

const CallingModal = () => {
  const socket = useSocket();
  const { isCalling, caller } = useAppSelector((state) => state.call);

  const handleAcceptCall = () => {
    socket.emit(SocketEvents.videoCallAccept, { callerId: caller?.id });
  };

  const handleRejectCall = () => {
    socket.emit(SocketEvents.videoCallReject, { callerId: caller?.id });
  };

  return (
    <Modal isOpen={isCalling} onClose={() => {}} title="Someone is calling">
      <StWrapper>
        {caller ? (
          <>
            <UserAvatar user={caller} fakeSize="82px" showProfile={false} textSizeRatio={1} size="large" />
            <StName>{`${caller.firstName} ${caller.lastName}`}</StName>
          </>
        ) : (
          'Anonymous is calling'
        )}
        <StActions>
          <StAcceptBtn onClick={handleAcceptCall}>
            <PhoneIcon size={24} />
          </StAcceptBtn>
          <StRejectBtn onClick={handleRejectCall}>
            <PhoneDownIcon size={24} />
          </StRejectBtn>
        </StActions>
      </StWrapper>
    </Modal>
  );
};

export default CallingModal;
