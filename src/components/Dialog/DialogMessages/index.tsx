import React from 'react';
import { FC, useRef, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useReadMessageMutation } from '../../../redux/services/messagesApi';
import { readMessage } from '../../../redux/slices/dialogs.slice';
import { scrollbarMixin } from '../../../styles/common/mixins';
import { IAttachment, IMessage, IUser } from '../../../types/entities';
import { formatDate } from '../../../utils/date.helpers';
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

const StBottom = styled.span`
  position: absolute;
  bottom: 0;
  width: 2px;
  height: 2px;
`;

interface IProps {
  messages: IMessage[];
  user: IUser | null;
  bottomRef: React.RefObject<HTMLSpanElement>;
}

const DialogMessages: FC<IProps> = ({ messages, user, bottomRef }) => {
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

  const shouldShowDate = (idx: number) => {
    const curMsg = messages[idx];
    const prevMsg = messages[idx - 1];
    if (!prevMsg) {
      return true;
    }
    if (formatDate('DD MM YY', curMsg?.createdAt) !== formatDate('DD MM YY', prevMsg?.createdAt)) {
      return true;
    }
    return false;
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
            shouldShowDate={shouldShowDate(idx)}
          />
        ))}
        <StBottom ref={bottomRef}></StBottom>
      </StMessages>
    </StWrapper>
  );
};

export default DialogMessages;
