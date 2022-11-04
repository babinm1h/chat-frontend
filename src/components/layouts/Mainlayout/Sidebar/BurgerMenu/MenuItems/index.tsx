import React from "react";
import {  useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch } from "../../../../../../hooks/useAppDispatch";
import { useModal } from "../../../../../../hooks/useModal";
import { logout } from "../../../../../../redux/slices/auth.slice";
import { StMenuItem } from "../../../../../../styles/common";
import { AllRoutes } from "../../../../../AppRoutes";
import Button from "../../../../../UI/Button";
import Modal from "../../../../../UI/Modal";
import MenuItemWithSubmenu from "./MenuItemWithSubmenu";
import MenuLink from "./MenuLink";

const StMenuList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const StModalContent = styled.ul`
  display: flex;
  align-items: center;
  padding: 20px 0;
  justify-content: flex-end;
  flex-direction: column;
  height: 100%;
`;
const StModalBtns = styled.ul`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

const MenuItems = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  const { isOpen, onClose, onOpen } = useModal();

  const handleLogout = () => {
    dispatch(logout());
    nav(AllRoutes.login);
  };

  return (
    <>
      <StMenuList>
        <MenuItemWithSubmenu label="Settings">
          <StMenuItem>Setting 1</StMenuItem>
          <StMenuItem>Setting 2</StMenuItem>
          <StMenuItem>Setting 3</StMenuItem>
        </MenuItemWithSubmenu>
        <MenuLink to={AllRoutes.main}>Main Page</MenuLink>
        <StMenuItem onClick={onOpen} className="logout">
          Logout
        </StMenuItem>
      </StMenuList>

      <Modal isOpen={isOpen} onClose={onClose} title="Are you sure?" size="small">
        <StModalContent>
          <StModalBtns>
            <Button onClick={handleLogout}>Logout</Button>
            <Button onClick={onClose}>Close</Button>
          </StModalBtns>
        </StModalContent>
      </Modal>
    </>
  );
};

export default MenuItems;
