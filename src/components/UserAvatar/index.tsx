import React, { FC } from 'react';
import Avatar from 'react-avatar';
import { useModal } from '../../hooks/useModal';
import { StAvatar } from '../../styles/common';
import { IUser } from '../../types/entities';
import Modal from '../UI/Modal';
import UserProfile from './UserProfile';

interface IProps {
  user: IUser;
  fakeSize?: string;
  size?: 'big' | 'small' | 'medium' | 'large';
  textSizeRatio?: number;
  showProfile?: boolean;
}

const UserAvatar: FC<IProps> = ({ user, size = 'small', fakeSize = '32px', textSizeRatio = 3, showProfile = true }) => {
  const { isOpen, onClose, onOpen } = useModal();

  const handleOpen = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    if (!showProfile) return;
    onOpen();
  };

  return (
    <>
      {user.avatar ? (
        <StAvatar size={size} onClick={handleOpen}>
          <img src={user.avatar} alt={user.firstName} />
        </StAvatar>
      ) : (
        <Avatar size={fakeSize} name={user.firstName} round textSizeRatio={textSizeRatio} onClick={handleOpen} />
      )}

      <Modal isOpen={isOpen} onClose={onClose} title={user.firstName}>
        <UserProfile user={user} />
      </Modal>
    </>
  );
};

export default UserAvatar;
