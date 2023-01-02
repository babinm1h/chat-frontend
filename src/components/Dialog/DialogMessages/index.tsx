import { FC, useRef, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useReadMessageMutation } from '../../../redux/services/messagesApi';
import { readMessage } from '../../../redux/slices/dialogs.slice';
import { scrollbarMixin } from '../../../styles/common/mixins';
import { IAttachment, IMessage, IUser } from '../../../types/entities';
import MessageItem from './MessageItem';

const StMessages = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const StWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  padding: 20px;
  overflow-x: hidden;
  overflow-y: auto;
  flex: 1 1 auto;
  position: relative;
  ${scrollbarMixin()};
  touch-action: none;
`;

interface IProps {
  messages: IMessage[];
  user: IUser | null;
}

const DialogMessages: FC<IProps> = ({ messages, user }) => {
  const dispatch = useAppDispatch();
  const [activeAudio, setActiveAudio] = useState<IAttachment | null>(null);
  const [fetchReadMessage] = useReadMessageMutation();

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const onSetActiveAudio = (att: IAttachment | null) => {
    setActiveAudio(att);
  };

  const onReadMessage = async (msgId: number, dialogId: number) => {
    dispatch(readMessage({ id: msgId, dialogId }));
    await fetchReadMessage(msgId);
  };

  return (
    <StWrapper ref={scrollAreaRef}>
      <StMessages>
        {messages.map((msg, idx, arr) => (
          <MessageItem
            activeAudio={activeAudio}
            onSetActiveAudio={onSetActiveAudio}
            key={msg.id}
            message={msg}
            user={user}
            repeated={arr[idx + 1]?.creatorId === msg.creatorId}
            scrollAreaRef={scrollAreaRef}
            onReadMessage={onReadMessage}
          />
        ))}
      </StMessages>
    </StWrapper>
  );
};

export default DialogMessages;
