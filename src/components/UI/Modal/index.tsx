import React, { PropsWithChildren, FC } from "react";
import styled from "styled-components";
import { CloseIcon } from "../../../utils/icons";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

const StModal = styled.div`
  background-color: ${({ theme }) => theme.currentTheme.background.secondary};
  border-radius: 6px;
  z-index: 20;
  color: ${({ theme }) => theme.currentTheme.text.primary};
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease-in-out;
  box-shadow: 0px 11px 15px -7px rgb(0 0 0 / 20%), 0px 24px 38px 3px rgb(0 0 0 / 14%),
    0px 9px 46px 8px rgb(0 0 0 / 12%);
  transition: all 0.25s ease-in-out;
  opacity: 0;
  transform: scale(0.3);
  &.medium {
    width: 50%;
    height: 50%;
  }
  &.fullscreen {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
  &.small {
    width: 30%;
    height: 30%;
  }
  @media (max-width: 700px) {
    width: 100% !important;
    height: 100% !important;
    border-radius: 0;
  }
  @media (max-height: 500px) {
    width: 100% !important;
    height: 100% !important;
    border-radius: 0;
  }
`;

const StOverlay = styled.div`
  background-color: ${({ theme }) => theme.colors.common.semitransparentBlack};
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 18;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.25s ease-in-out;
  &.modal-enter-done {
    opacity: 1;
    ${StModal} {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const StHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  padding: 0 20px;
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    color: white;
  }
  h5 {
    font-size: 18px;
  }
`;

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  size?: "small" | "medium" | "fullscreen";
}

const Modal: FC<PropsWithChildren<IProps>> = ({ children, isOpen, onClose, title, size = "medium" }) => {
  return createPortal(
    <CSSTransition
      timeout={100}
      in={isOpen}
      classNames={{
        enterDone: `modal-enter-done`,
      }}
      mountOnEnter
      unmountOnExit
    >
      <StOverlay onClick={onClose}>
        <StModal onClick={(e) => e.stopPropagation()} className={size}>
          <StHeader>
            <h5>{title}</h5>
            <button onClick={onClose}>
              <CloseIcon size={18} />
            </button>
          </StHeader>
          {children}
        </StModal>
      </StOverlay>
    </CSSTransition>,
    document.body
  );
};

export default Modal;
