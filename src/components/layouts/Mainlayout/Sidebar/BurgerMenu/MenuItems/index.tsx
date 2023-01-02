import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch } from '../../../../../../hooks/useAppDispatch';
import { useModal } from '../../../../../../hooks/useModal';
import { logout } from '../../../../../../redux/slices/auth.slice';
import { StMenuItem } from '../../../../../../styles/common';
import { AllRoutes } from '../../../../../AppRoutes';
import CreateGroupForm from '../../../../../forms/CreateGroupForm';
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
  const nav = useNavigate();

  const { isOpen, onClose, onOpen } = useModal();
  const { isOpen: isCreateGroupOpen, onClose: onCreateGroupClose, onOpen: onCreateGroupOpen } = useModal();

  const handleLogout = () => {
    dispatch(logout());
    nav(AllRoutes.login);
  };

  return (
    <>
      <StMenuList>
        <MenuLink to={AllRoutes.home}>Main Page</MenuLink>
        <StMenuItem onClick={onCreateGroupOpen}>Create Group</StMenuItem>
        <MenuItemWithSubmenu label="Settings">
          <StMenuItem>Setting 1</StMenuItem>
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
    </>
  );
};

export default MenuItems;
