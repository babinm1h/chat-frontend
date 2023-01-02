import React, { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { AllRoutes } from '../AppRoutes';

const StTab = styled.button`
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.currentTheme.background.secondary};
  color: ${({ theme }) => theme.currentTheme.text.primary};
  font-size: 1rem;
  flex: 1;
  transition: all 0.2s ease-in-out;
  position: relative;
  width: 100%;
  &:hover {
    background-color: ${({ theme }) => theme.currentTheme.background.hover};
  }
  &:active {
    background-color: ${({ theme }) => theme.currentTheme.background.active};
  }
  &::after {
    position: absolute;
    bottom: 0;
    transition: all 0.25s ease-in-out;
    left: 0;
    height: 2px;
    width: 100%;
    content: '';
    background-color: ${({ theme }) => theme.colors.common.primaryBlue};
    transform: scaleX(0);
    opacity: 0;
  }
  &.active {
    &::after {
      transform: scaleX(1);
      opacity: 1;
    }
  }
  a {
    width: 100%;
    height: 100%;
    color: inherit;
    padding: 0 15px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
`;

interface ITabProps {
  to: AllRoutes;
  active: boolean;
  onClick: () => void;
}

export const Tab: FC<PropsWithChildren<ITabProps>> = ({ children, to, active, onClick }) => {
  return (
    <StTab className={cn({ active })} onClick={onClick}>
      {children}
    </StTab>
  );
};
export default Tab;
