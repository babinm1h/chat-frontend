import cn from "classnames";
import React, { FC, PropsWithChildren, useState } from "react";
import styled from "styled-components";
import { StMenuItem } from "../../../../../../../styles/common";

const StSubmenu = styled.ul`
  display: flex;
  flex-direction: column;
  opacity: 0;
  transition: all 0.2s ease-in-out;
  height: 0;
  &.open {
    opacity: 1;
    height: 100%;
  }
  ${StMenuItem} {
    padding-left: 35px;
  }
`;

const StItem = styled.li`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const StLabel = styled.span`
  display: flex;
  gap: 10px;
  padding: 10px 20px;
  transition: all 0.2s ease-in;
  cursor: pointer;
  color: ${({ theme }) => theme.currentTheme.text.primary};
  &:hover {
    background-color: ${({ theme }) => theme.currentTheme.background.hover};
  }
  &.active {
    background-color: ${({ theme }) => theme.currentTheme.background.active};
  }
`;

interface IProps {
  label: string;
}

const MenuItemWithSubmenu: FC<PropsWithChildren<IProps>> = ({ label, children }) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <StItem>
      <StLabel onClick={toggleOpen}>{label}</StLabel>
      <StSubmenu className={cn({ open })}>{children}</StSubmenu>
    </StItem>
  );
};

export default MenuItemWithSubmenu;
