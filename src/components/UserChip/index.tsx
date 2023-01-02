import React, { FC } from 'react';
import Avatar from 'react-avatar';
import styled from 'styled-components';
import { CloseIcon } from '../../assets/icons';
import { lineClampMixin } from '../../styles/common/mixins';
import { IUser } from '../../types/entities';

const StChipText = styled.span`
  ${lineClampMixin()};
  max-width: 100px;
  font-size: 14px;
`;

const StChipImg = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 22px;
  height: 22px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StChipRemove = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.common.primaryBlue};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  transform: rotate(-45deg);
`;

const StChip = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.currentTheme.background.hover};
  cursor: default;
  gap: 8px;
  &:hover {
    ${StChipRemove} {
      opacity: 1;
      transform: rotate(0deg);
    }
  }
`;

interface IProps {
  onRemove: (id: number) => void;
  user: IUser;
}

const UserChip: FC<IProps> = ({ onRemove, user }) => {
  return (
    <StChip>
      <StChipImg>
        {user.avatar ? <img alt="user" src={user.avatar} /> : <Avatar name={user.firstName} size={`22px`} round />}
        <StChipRemove onClick={() => onRemove(user.id)}>
          <CloseIcon size={14} className="remove__icon" />
        </StChipRemove>
      </StChipImg>
      <StChipText>{`${user.firstName} ${user.firstName}`}</StChipText>
    </StChip>
  );
};

export default UserChip;
