import { AnimatePresence } from "framer-motion";
import React from "react";
import styled from "styled-components";
import { useModal } from "../../../hooks/useModal";
import { MenuIcon } from "../../../utils/icons";
import Modal from "../../UI/Modal";
import BurgerMenu from "../BurgerMenu";

const StHeader = styled.div`
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  position: sticky;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 20px;
  background-color: ${({ theme }) => theme.currentTheme.background.secondary};
  .burger-icon {
    cursor: pointer;
  }
`;

const StInput = styled.input`
  width: 100%;
  padding: 10px 15px;
  background-color: ${({ theme }) => theme.currentTheme.background.tertiary};
  color: ${({ theme }) => theme.currentTheme.text.primary};
  border-radius: 6px;
  &:focus {
    &::placeholder {
      transition: all 0.2s ease-in;
      opacity: 0.8;
    }
  }
`;

const SidebarHeader = () => {
  const { isOpen, onClose, onOpen } = useModal();
  const { isOpen: isModalOpen, onClose: onModalClose, onOpen: onModalOpen } = useModal();

  return (
    <StHeader>
      <MenuIcon size={28} className="burger-icon" onClick={onOpen} />
      <AnimatePresence exitBeforeEnter>{isOpen && <BurgerMenu onClose={onClose} />}</AnimatePresence>
      <StInput type="text" placeholder="Search" />
      {isModalOpen && <Modal isOpen={isModalOpen} onClose={onModalClose} title="Some title"></Modal>}
    </StHeader>
  );
};

export default SidebarHeader;
