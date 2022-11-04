import React, { FC, PropsWithChildren, RefObject } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";

const StWrapper = styled.div<{ top: number; left: number }>`
  padding: 5px 0;
  position: absolute;
  top: ${({ top }) => `${top}px`};
  left: ${({ left }) => `${left}px`};
  width: 200px;
  background-color: ${({ theme }) => theme.currentTheme.background.secondary};
  border-radius: 4px;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.1s ease-in-out;
  z-index: 5;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%),
    0px 1px 10px 0px rgb(0 0 0 / 12%);
  &.menu-enter-done {
    opacity: 1;
    transform: scale(1);
  }
`;
interface IProps {
  top: number;
  left: number;
  isOpen: boolean;
  menuRef?: RefObject<HTMLDivElement>;
}

const ContextMenu: FC<PropsWithChildren<IProps>> = ({ left, top, children, isOpen, menuRef }) => {
  return createPortal(
    <CSSTransition
      in={isOpen}
      timeout={50}
      classNames={{ enterDone: "menu-enter-done" }}
      mountOnEnter
      unmountOnExit
    >
      <StWrapper
        ref={menuRef}
        top={top}
        left={left}
        onContextMenu={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </StWrapper>
    </CSSTransition>,
    document.body
  );
};

export default ContextMenu;
