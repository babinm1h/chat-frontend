import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch } from '../../../../../../hooks/useAppDispatch';
import { useModal } from '../../../../../../hooks/useModal';
import { useSocket } from '../../../../../../hooks/useSocket';
import { logout } from '../../../../../../redux/slices/auth.slice';
import { StMenuItem } from '../../../../../../styles/common';
import { AllRoutes } from '../../../../../AppRoutes';
import CreateGroupForm from '../../../../../forms/CreateGroupForm';
import EditProfileForm from '../../../../../forms/EditProfileForm';
import Modal from '../../../../../UI/Modal';
import MenuItemWithSubmenu from './MenuItemWithSubmenu';
import MenuLink from './MenuLink';

const StMenuList = styled.ul`
  display: flex;
  flex-direction: column;
`;

interface IProps {}

const MenuItems: FC<IProps> = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigate();const socket = useSocket();

  const { isOpen, onClose, onOpen } = useModal();
  const { isOpen: isCreateGroupOpen, onClose: onCreateGroupClose, onOpen: onCreateGroupOpen } = useModal();
  const editProfileModal = useModal();

  const handleLogout = () => {
    dispatch(logout());
    socket.disconnect();
    nav(AllRoutes.login);
  };

  return (
    <>
      <StMenuList>
        <MenuLink to={AllRoutes.dialogs}>Messages</MenuLink>
        <MenuLink to={AllRoutes.home}>Main Page</MenuLink>
        <StMenuItem onClick={onCreateGroupOpen}>Create Group</StMenuItem>
        <MenuItemWithSubmenu label="Settings">
          <StMenuItem onClick={editProfileModal.onOpen}>Edit Profile</StMenuItem>
          <StMenuItem>Setting 2</StMenuItem>
          <StMenuItem>Setting 3</StMenuItem>
        </MenuItemWithSubmenu>
        <StMenuItem onClick={onOpen} className="logout">
          Logout
        </StMenuItem>
      </StMenuList>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Confirm Logout"
        withButtons
        onConfirm={handleLogout}
        confirmText={'Logout'}
      />

      <Modal isOpen={isCreateGroupOpen} onClose={onCreateGroupClose} title="Create Group">
        <CreateGroupForm onClose={onCreateGroupClose} />
      </Modal>

      <Modal isOpen={editProfileModal.isOpen} onClose={editProfileModal.onClose} title="Edit Profile">
        <EditProfileForm onClose={editProfileModal.onClose} />
      </Modal>
    </>
  );
};

export default MenuItems;
