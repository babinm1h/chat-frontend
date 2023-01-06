import React, { FC } from 'react';
import styled from 'styled-components';
import { lineClampMixin } from '../../../styles/common/mixins';
import { IUser } from '../../../types/entities';
import Button from '../../UI/Button';
import UserAvatar from '../../UserAvatar';

const StItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  background-color: ${({ theme }) => theme.currentTheme.background.secondary};
  border-radius: 6px;
  padding: 10px 15px;
  align-items: center;
  color: ${({ theme }) => theme.currentTheme.text.primary};
  cursor: pointer;
`;

const StInfo = styled.div`
  flex: 1 1 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const StName = styled.div`
  ${lineClampMixin()}
`;

const StActions = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

interface IProps {
  friend: IUser;
  handleDelete: (frId: number) => void;
  onUserClick: (id: number) => void;
  friendEntityId: number;
}

const FriendItem: FC<IProps> = ({ friend, handleDelete, onUserClick, friendEntityId }) => {
  const onDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleDelete(friendEntityId);
  };

  return (
    <StItem onClick={() => onUserClick(friend.id)}>
      <UserAvatar size="medium" fakeSize="45px" user={friend} />
      <StInfo>
        <StName>{friend.firstName + ' ' + friend.lastName}</StName>
        <div>
          <img src={`https://flagcdn.com/${friend.country.toLowerCase()}.svg`} alt="flag" width={24} height={14} />
        </div>
      </StInfo>
      <StActions>
        <Button onClick={onDelete}>Delete</Button>
      </StActions>
    </StItem>
  );
};

export default FriendItem;
