import React from "react";
import styled from "styled-components";
import { useDialog } from "../../hooks/componentsHooks/useDialog";
import DialogForm from "../forms/DialogForm";
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
  justify-content: center;
  flex-direction: column;
`;

const StLastOnline = styled.div`
  color: ${({ theme }) => theme.currentTheme.text.secondary};
`;

const StMobile = styled.div`
  color: ${({ theme }) => theme.currentTheme.text.primary};
`;

const Dialog = () => {
  const { activeDialog, error, isFetching, user } = useDialog();

  if (!activeDialog || isFetching) {
    return <>Loading</>;
  }

  return (
    <StWrapper>
      <StHeader>
        <StMobile>{activeDialog.receiver.firstName}</StMobile>
        <StLastOnline>last seen 20 min ago</StLastOnline>
      </StHeader>
      <DialogMessages messages={activeDialog.messages} user={user} />
      <DialogForm />
    </StWrapper>
  );
};

export default Dialog;
