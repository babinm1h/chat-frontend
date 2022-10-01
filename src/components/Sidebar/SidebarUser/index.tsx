import React, { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IDialog } from "../../../types/entities";
import { getMessageDate } from "../../../utils/date.helpers";
import cn from "classnames";
import { StAvatar } from "../../../styles/common";

const StMessage = styled.p<{ size: number }>`
  color: ${({ theme }) => theme.currentTheme.text.secondary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  max-width: ${({ size }) => size && `${size - 5}px`};
  display: block;
`;

const StDate = styled.span`
  color: ${({ theme }) => theme.currentTheme.text.secondary};
  font-size: 13px;
`;

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
    ${StMessage} {
      color: ${({ theme }) => theme.currentTheme.text.primary} !important;
    }
    ${StDate} {
      color: ${({ theme }) => theme.currentTheme.text.primary} !important;
    }
  }
`;

const StInfo = styled.div`
  flex: 1 1 auto;
  padding-right: 5px;
  display: flex;
  flex-direction: column;
`;

const StName = styled.div`
  color: ${({ theme }) => theme.currentTheme.text.primary};
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
  authUserId: number;
}

const SidebarUser: FC<IProps> = ({ dialog, activeDialogId, handleSetActiveDialog, authUserId }) => {
  const [size, setSize] = useState(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (wrapperRef.current) {
      setSize(wrapperRef.current?.clientWidth);
    }
  }, [wrapperRef]);

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
      <StAvatar size="medium"></StAvatar>
      <StInfo ref={wrapperRef}>
        <StHeader>
          <StName>{getReceiverName()}</StName>
          <StDate>{lastMessageDate}</StDate>
        </StHeader>
        <StMessage size={size}>{dialog.lastMessage?.text}</StMessage>
      </StInfo>
    </StWrapper>
  );
};

export default SidebarUser;
