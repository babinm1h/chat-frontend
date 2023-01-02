import React, { FC, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../../../../hooks/useAppDispatch';
import { useDebounce } from '../../../../../hooks/useDebounce';
import { useModal } from '../../../../../hooks/useModal';
import { setSearchMode } from '../../../../../redux/slices/dialogs.slice';
import { searchUsers } from '../../../../../redux/thunks/dialogs.thunks';
import { MenuIcon } from '../../../../../assets/icons';
import BurgerMenu from '../BurgerMenu';
import { IUser } from '../../../../../types/entities';
import { NavLink } from 'react-router-dom';
import { AllRoutes } from '../../../../AppRoutes';
import { Tab } from '../../../../Tab';

const StHeader = styled.div`
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  position: sticky;
  padding: 10px;
  display: flex;
  background-color: ${({ theme }) => theme.currentTheme.background.secondary};
  flex-direction: column;
  gap: 10px;
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

const StSearchBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

const StTabs = styled.div`
  display: flex;
`;

interface IProps {
  authUser: IUser;
  searchMode: boolean;
  activeTab: number;
  setActiveTab: (id: number) => void;
}

const SidebarHeader: FC<IProps> = ({ authUser, searchMode, activeTab, setActiveTab }) => {
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState('');

  const searchQuery = useDebounce(searchValue, 700);
  const { isOpen, onClose, onOpen } = useModal();

  const tabs = useMemo(() => {
    return [
      { tabContent: 'Dialogs', id: 1, to: AllRoutes.dialogs },
      { tabContent: 'Group Dialogs', id: 2, to: AllRoutes.group_dialogs },
    ];
  }, []);

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
      <StSearchBlock>
        <MenuIcon size={28} className="burger-icon" onClick={onOpen} />
        <StInput type="text" placeholder="Search" onChange={(e) => setSearchValue(e.target.value)} />
      </StSearchBlock>
      <StTabs>
        {tabs.map((t) => (
          <Tab key={t.id} to={t.to} active={activeTab === t.id} onClick={() => setActiveTab(t.id)}>
            <NavLink to={t.to}>{t.tabContent}</NavLink>
          </Tab>
        ))}
      </StTabs>
      <BurgerMenu onClose={onClose} authUser={authUser} isOpen={isOpen} />
    </StHeader>
  );
};

export default SidebarHeader;
