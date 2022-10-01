import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { logout } from "../../../../redux/slices/auth.slice";
import { AllRoutes } from "../../../AppRoutes";

const StMenuList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const StMenuItem = styled.ul`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  transition: all 0.2s ease-in;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.currentTheme.background.hover};
  }
  &.logout {
    color: red;
  }
`;

const MenuItems = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    nav(AllRoutes.login);
  };

  return (
    <StMenuList>
      <StMenuItem onClick={handleLogout} className="logout">
        Logout
      </StMenuItem>
    </StMenuList>
  );
};

export default MenuItems;
