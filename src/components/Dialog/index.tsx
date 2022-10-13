import React from "react";
import styled from "styled-components";
import { useDialog } from "../../hooks/componentsHooks/useDialog";
import { StAvatar } from "../../styles/common";
import DialogForm from "../forms/DialogForm";
import DotsLoader from "../UI/DotsLoader";
import DialogMessages from "./DialogMessages";

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
  const { activeDialog, isActiveDialogFetching, activeDialogError, user, typingUser } = useDialog();

  if (!activeDialog || isActiveDialogFetching) {
    return <>Loading</>;
  }

  return (
    <StWrapper>
      <StHeader>
        <StAvatar size="small"></StAvatar>
        <StReceiver>
          <StMobile>{activeDialog.receiver.firstName}</StMobile>
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
      <DialogForm user={user} />
    </StWrapper>
  );
};

export default Dialog;
