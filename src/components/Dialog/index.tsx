import React from "react";
import styled from "styled-components";
import { useDialog } from "../../hooks/componentsHooks/useDialog";
import { StAvatar } from "../../styles/common";
import DialogForm from "../forms/DialogForm";
import DotsLoader from "../UI/DotsLoader";
import DialogMessages from "./DialogMessages";
import Avatar from "react-avatar";

const StWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  color: white;
  flex-direction: column;
`;

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

const Dialog = () => {
  const { activeDialog, isActiveDialogFetching, user, typingUser, editableMessage, replyToMsg } = useDialog();

  if (!activeDialog || isActiveDialogFetching) {
    return <>Loading</>;
  }

  const receiver = user?.id === activeDialog.receiverId ? activeDialog.creator : activeDialog.receiver;

  return (
    <StWrapper>
      <StHeader>
        {receiver.avatar ? (
          <StAvatar size="medium">
            <img src={receiver.avatar} alt={receiver.firstName} />
          </StAvatar>
        ) : (
          <Avatar name={receiver.firstName} size="32px" round />
        )}
        <StReceiver>
          <StMobile>{receiver.firstName}</StMobile>
          <StLastOnline>
            {typingUser ? (
              <StTyping>
                <DotsLoader />
                <p>{typingUser} is typing</p>
              </StTyping>
            ) : (
              `last seen 20 min ago`
            )}
          </StLastOnline>
        </StReceiver>
      </StHeader>
      <DialogMessages messages={activeDialog.messages} user={user} />
      <DialogForm user={user} editableMessage={editableMessage} replyToMsg={replyToMsg} />
    </StWrapper>
  );
};

export default Dialog;
