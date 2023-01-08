import React from 'react';
import styled, { useTheme } from 'styled-components';
import { useDialog } from '../../hooks/componentsHooks/useDialog';
import DialogForm from '../forms/DialogForm';
import DialogMessages from './DialogMessages';
import DialogHeader from './DialogHeader';
import CallOverlay from '../Call/CallOverlay';
import { BiMessageSquareCheck } from 'react-icons/bi';
import MessageSkeleton from './DialogMessages/MessageSkeleton';
import { IUser } from '../../types/entities';

const StWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  color: white;
  flex-direction: column;
  position: relative;
`;

const Dialog = () => {
  const {
    activeDialog,
    isActiveDialogFetching,
    user,
    typingUser,
    editableMessage,
    replyToMsg,
    bottomRef,
    peer,
    callDialogId,
  } = useDialog();

  const isLoading = !activeDialog || isActiveDialogFetching;

  const receiver = user?.id === activeDialog?.receiverId ? activeDialog?.creator : activeDialog?.receiver;

  return (
    <StWrapper>
      {isLoading ? (
        <MessagesLoader />
      ) : (
        <>
          {callDialogId === activeDialog?.id && <CallOverlay />}
          <DialogHeader receiver={receiver || ({} as IUser)} typingUser={typingUser} peer={peer} authUser={user} />
          <DialogMessages messages={activeDialog.messages} user={user} bottomRef={bottomRef} />
          <DialogForm user={user} editableMessage={editableMessage} replyToMsg={replyToMsg} bottomRef={bottomRef} />
        </>
      )}
    </StWrapper>
  );
};

export default Dialog;

const StList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
`;

const MessagesLoader = () => {
  const theme = useTheme();
  const bgc = theme.currentTheme.background.receivedMessage;

  return (
    <StList>
      {Array(10)
        .fill(``)
        .map((_, idx) => (
          <MessageSkeleton key={idx} background={bgc} idx={idx} />
        ))}
    </StList>
  );
};
