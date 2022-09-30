import React, { PropsWithChildren, FC } from "react";
import { StOverlay } from "../../../styles/common";
import styled from "styled-components";
import Portal from "../../Portal";
import { CloseIcon } from "../../../utils/icons";

const StModal = styled.div`
  background-color: ${({ theme }) => theme.currentTheme.background.secondary};
  width: 500px;
  height: 400px;
  border-radius: 8px;
  z-index: 20;
  color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const StHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const overlayVars = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
  exit: { opacity: 0 },
};

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const Modal: FC<PropsWithChildren<IProps>> = ({ children, isOpen, onClose, title }) => {
  return (
    <Portal isOpen={isOpen}>
      <StOverlay onClick={onClose}>
        <StModal onClick={(e) => e.stopPropagation()}>
          <StHeader>
            <h5>{title}</h5>
            <button onClick={onClose}>
              <CloseIcon size={18} />
            </button>
          </StHeader>
          {children}
        </StModal>
      </StOverlay>
    </Portal>
  );
};

export default Modal;
