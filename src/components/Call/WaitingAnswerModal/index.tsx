import { useEffect } from 'react';
import styled from 'styled-components';
import { PhoneDownIcon } from '../../../assets/icons';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useSocket } from '../../../hooks/useSocket';
import { userSelector } from '../../../redux/slices/auth.slice';
import { SocketEvents } from '../../../types/socketEvents.types';
import { notifyWarn } from '../../../utils/toast.helpers';
import Modal from '../../UI/Modal';

const StWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const StActions = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
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

const WaitingAnswerModal = () => {
  const socket = useSocket();
  const auth = useAppSelector(userSelector);
  const { isWaitingForAnswer, receiver } = useAppSelector((state) => state.call);

  const handleHangUp = () => {
    socket.emit(SocketEvents.videoCallHangup, { callerId: auth?.id, receiverId: receiver?.id });
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isWaitingForAnswer) {
      timer = setTimeout(() => {
        handleHangUp();
        notifyWarn("User did't answer, the call was canceled");
      }, 20000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isWaitingForAnswer]);

  return (
    <Modal isOpen={isWaitingForAnswer} onClose={() => {}} title="Calling...">
      <StWrapper>
        Wait for answer...
        <StActions>
          <StRejectBtn onClick={handleHangUp}>
            <PhoneDownIcon size={24} />
          </StRejectBtn>
        </StActions>
      </StWrapper>
    </Modal>
  );
};

export default WaitingAnswerModal;
