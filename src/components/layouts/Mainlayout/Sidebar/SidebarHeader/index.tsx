import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../../../../hooks/useAppDispatch";
import { useDebounce } from "../../../../../hooks/useDebounce";
import { useModal } from "../../../../../hooks/useModal";
import { setSearchMode } from "../../../../../redux/slices/dialogs.slice";
import { searchUsers } from "../../../../../redux/thunks/dialogs.thunks";
import { MenuIcon } from "../../../../../utils/icons";
import Modal from "../../../../UI/Modal";
import BurgerMenu from "../BurgerMenu";
import { Transition, TransitionStatus } from "react-transition-group";

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

interface IProps {
  name: string;
  searchMode: boolean;
}

const sidebarTransitionStyles = {
  entering: { transform: `translateX(-100%)` },
  entered: { transform: `translateX(0)` },
  exiting: { transform: `translateX(-100%)` },
  exited: { transform: `translateX(-100%)` },
} as Record<TransitionStatus, { transform: string }>;

const overlayTransitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
} as Record<TransitionStatus, { opacity: number }>;

const SidebarHeader: FC<IProps> = ({ name, searchMode }) => {
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState("");
  const searchQuery = useDebounce(searchValue, 700);

  const { isOpen, onClose, onOpen } = useModal();

  useEffect(() => {
    if (!searchQuery) {
      dispatch(setSearchMode(false));
      return;
    }
    if (!searchMode) dispatch(setSearchMode(true));
    dispatch(searchUsers(searchQuery));
  }, [searchQuery]);

  return (
    <StHeader>
      <MenuIcon size={28} className="burger-icon" onClick={onOpen} />

      <BurgerMenu onClose={onClose} name={name} isOpen={isOpen} />

      <StInput type="text" placeholder="Search" onChange={(e) => setSearchValue(e.target.value)} />
    </StHeader>
  );
};

export default SidebarHeader;
