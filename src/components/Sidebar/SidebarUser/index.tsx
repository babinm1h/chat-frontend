import React, { FC } from "react";
import styled from "styled-components";
import { IDialog } from "../../../types/entities";
import { getMessageDate } from "../../../utils/date.helpers";
import cn from "classnames";

const StWrapper = styled.li`
  display: flex;
  align-items: center;
  gap: 15px;
  transition: all 0.2s ease-in;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.currentTheme.background.hover};
  }
  &.active {
    background-color: ${({ theme }) => theme.currentTheme.background.myMessage};
  }
`;

const StAvatar = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: lime;
  flex-shrink: 0;
  img {
    object-fit: cover;
    width: 100%;
  }
`;

const StInfo = styled.div`
  flex: 1 1 auto;
  padding-right: 5px;
  p {
    color: ${({ theme }) => theme.currentTheme.text.secondary};
  }
`;

const StName = styled.div`
  color: ${({ theme }) => theme.currentTheme.text.primary};
`;

const StDate = styled.span`
  color: ${({ theme }) => theme.currentTheme.text.secondary};
  font-size: 14px;
`;

const StHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 2px;
`;

interface IProps {
  dialog: IDialog;
  activeDialogId?: string;
  handleSetActiveDialog: (id: number) => void;
  authUserId?: number;
}

const SidebarUser: FC<IProps> = ({ dialog, activeDialogId, handleSetActiveDialog, authUserId }) => {
  const lastMessageDate = getMessageDate(dialog.createdAt);

  const getReceiverName = () => {
    const receiver = authUserId === dialog.receiverId ? dialog.creator : dialog.receiver;
    return `${receiver.firstName} ${receiver.lastName}`;
  };

  return (
    <StWrapper
      onClick={() => handleSetActiveDialog(dialog.id)}
      className={cn("fax", {
        active: activeDialogId && +activeDialogId === dialog.id,
      })}
    >
      <StAvatar></StAvatar>
      <StInfo>
        <StHeader>
          <StName>{getReceiverName()}</StName>
          <StDate>{lastMessageDate}</StDate>
        </StHeader>
        <p>{dialog.message}</p>
      </StInfo>
    </StWrapper>
  );
};

export default SidebarUser;
