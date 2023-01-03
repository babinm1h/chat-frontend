import React, { FC } from 'react';
import styled from 'styled-components';
import { IDialog, IGroupDialog } from '../../../../../types/entities';
import { getMessageTime } from '../../../../../utils/date.helpers';
import cn from 'classnames';
import { StAvatar } from '../../../../../styles/common';
import Avatar from 'react-avatar';
import { lineClampMixin } from '../../../../../styles/common/mixins';
import UserAvatar from '../../../../UserAvatar';

const StUnreaded = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  background-color: #3d546a;
  padding: 2px 6px;
  border-radius: 24px;
  font-weight: 500;
  vertical-align: middle;
  flex-shrink: 0;
`;

const StMessage = styled.p`
  ${lineClampMixin()};
  color: ${({ theme }) => theme.currentTheme.text.secondary};
  flex: 1 1 auto;
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
    ${StUnreaded} {
      background-color: #7aa3c8;
      color: #3d546a;
    }
  }
`;

const StMessageInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
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
  const lastMessageDate = getMessageTime(dialog.lastMessage?.createdAt);
  const receiver = authUserId === dialog.receiverId ? dialog.creator : dialog.receiver;

  const unreaded = dialog.messages.filter((msg) => !msg.readed && msg.creatorId !== authUserId);

  return (
    <StWrapper
      onClick={() => handleSetActiveDialog(dialog.id)}
      className={cn('', {
        active: activeDialogId && +activeDialogId === dialog.id,
      })}
    >
      <UserAvatar user={receiver} size="medium" fakeSize="45px" />
      <StInfo>
        <StHeader>
          <StName>{`${receiver.firstName} ${receiver.lastName}`}</StName>
          <StDate>{lastMessageDate}</StDate>
        </StHeader>
        <StMessageInfo>
          <StMessage>{dialog.lastMessage?.text}</StMessage>
          {unreaded?.length > 0 && <StUnreaded>{unreaded.length}</StUnreaded>}
        </StMessageInfo>
      </StInfo>
    </StWrapper>
  );
};

export default SidebarUser;

interface IGroupProps {
  dialog: IGroupDialog;
  activeDialogId?: string;
  handleSetActiveDialog: (id: number) => void;
}

export const SidebarGroup: FC<IGroupProps> = ({ dialog, activeDialogId, handleSetActiveDialog }) => {
  const lastMessageDate = getMessageTime(dialog.lastMessage?.createdAt);

  return (
    <StWrapper
      onClick={() => handleSetActiveDialog(dialog.id)}
      className={cn('', {
        active: activeDialogId && +activeDialogId === dialog.id,
      })}
    >
      {dialog.avatar ? (
        <StAvatar size="medium">
          <img src={dialog.avatar} alt={dialog.title} />
        </StAvatar>
      ) : (
        <StAvatar size="medium">
          <Avatar name={dialog.title} size="45px" round />
        </StAvatar>
      )}
      <StInfo>
        <StHeader>
          <StName>{dialog.title}</StName>
          <StDate>{lastMessageDate}</StDate>
        </StHeader>
        <StMessageInfo>
          <StMessage>{dialog.lastMessage?.text || 'No messages yet'}</StMessage>
          <StUnreaded>74</StUnreaded>
        </StMessageInfo>
      </StInfo>
    </StWrapper>
  );
};
