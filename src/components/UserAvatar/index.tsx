import React, { FC } from 'react';
import Avatar from 'react-avatar';
import { StAvatar } from '../../styles/common';
import { IUser } from '../../types/entities';

interface IProps {
  user: IUser;
  fakeSize?: string;
  size?: 'big' | 'small' | 'medium' | 'large';
  textSizeRatio?: number;
}

const UserAvatar: FC<IProps> = ({ user, size = 'small', fakeSize = '32px', textSizeRatio = 3 }) => {
  return user.avatar ? (
    <StAvatar size={size}>
      <img src={user.avatar} alt={user.firstName} />
    </StAvatar>
  ) : (
    <Avatar size={fakeSize} name={user.firstName} round textSizeRatio={textSizeRatio} />
  );
};

export default UserAvatar;
