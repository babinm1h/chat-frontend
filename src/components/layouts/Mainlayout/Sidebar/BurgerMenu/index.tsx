import { FC } from "react";
import styled from "styled-components";
import { StAvatar } from "../../../../../styles/common";
import MenuItems from "./MenuItems";
import { CSSTransition } from "react-transition-group";

const StWrapper = styled.div`
  width: 320px;
  min-height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.currentTheme.background.secondary};
  transition: all 0.2s ease-in-out;
  transform: translateX(-100%);
`;

const StOverlay = styled.div`
  background-color: ${({ theme }) => theme.colors.common.semitransparentBlack};
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 5;
  top: 0;
  right: 0;
  left: 0;
  opacity: 0;
  transition: all 0.3s ease-in-out;
  &.sidebar-enter-done {
    opacity: 1;
    ${StWrapper} {
      transform: translateX(0);
    }
  }
`;

const StHeader = styled.div`
  padding: 15px 20px;
`;

const StName = styled.div`
  margin: 10px 0 2px 0;
`;

const StSetStatus = styled.p`
  color: #56adeb;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

interface IProps {
  onClose: () => void;
  name: string;
  isOpen: boolean;
}

const BurgerMenu: FC<IProps> = ({ onClose, name, isOpen }) => {
  return (
    <CSSTransition
      in={isOpen}
      timeout={100}
      mountOnEnter
      unmountOnExit
      classNames={{ enterDone: "sidebar-enter-done" }}
    >
      <StOverlay onClick={onClose}>
        <StWrapper onClick={(e) => e.stopPropagation()}>
          <StHeader>
            <StAvatar size="medium"></StAvatar>
            <StName>{name}</StName>
            <StSetStatus>Установить статус</StSetStatus>
          </StHeader>
          <MenuItems />
        </StWrapper>
      </StOverlay>
    </CSSTransition>
  );
};

export default BurgerMenu;
