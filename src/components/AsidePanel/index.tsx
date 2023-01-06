import React, { FC } from 'react';
import styled from 'styled-components';
import { ChatIcon, UsersIcon, SettingsIcon, SunIcon, MoonIcon, LogoutIcon, HomeIcon } from '../../assets/icons';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useModal } from '../../hooks/useModal';
import { StMenuItem } from '../../styles/common';
import { AllRoutes } from '../AppRoutes';
import EditProfileForm from '../forms/EditProfileForm';
import Modal from '../UI/Modal';
import UserAvatar from '../UserAvatar';
import MenuLink from '../layouts/Mainlayout/Sidebar/BurgerMenu/MenuItems/MenuLink';
import { useTheme } from '../../hooks/useTheme';
import { AppThemes } from '../../context/themeContext';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { logout, userSelector } from '../../redux/slices/auth.slice';
import { useSocket } from '../../hooks/useSocket';

const StAside = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: relative;
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.currentTheme.background.primary};
  background-color: ${({ theme }) => theme.currentTheme.background.secondary};
  position: fixed;
  z-index: 1;
`;

const StMenu = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  height: 100%;
`;

const StUser = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 15px;
`;

const StCount = styled.div`
  position: absolute;
  top: 6px;
  right: 10px;
  background-color: ${({ theme }) => theme.colors.common.primaryBlue};
  font-size: 12px;
  border-radius: 50%;
  min-width: 16px;
  height: 16px;
  padding: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;

const StFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-direction: column;
  padding: 20px 0;
`;

interface IProps {
  asideRef?: React.RefObject<HTMLDivElement>;
}

const AsidePanel: FC<IProps> = ({ asideRef }) => {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(userSelector);
  const { isOpen, onClose, onOpen } = useModal();
  const { theme, setTheme } = useTheme();
  const socket = useSocket();

  const handleLogout = () => {
    dispatch(logout());
    socket.disconnect();
  };

  const isDarkTheme = theme === AppThemes.dark;

  const toggleTheme = () => {
    if (isDarkTheme) {
      setTheme(AppThemes.light);
    } else {
      setTheme(AppThemes.dark);
    }
  };

  return (
    <>
      <StAside ref={asideRef}>
        <StUser>{authUser && <UserAvatar user={authUser} size="medium" fakeSize="45px" />}</StUser>
        <StMenu>
          <MenuLink to={AllRoutes.home} centered>
            <HomeIcon size={25} />
          </MenuLink>
          <MenuLink to={AllRoutes.dialogs} centered>
            <ChatIcon size={24} />
          </MenuLink>
          <MenuLink to={AllRoutes.friends} centered>
            <UsersIcon size={24} />
            {authUser && authUser?.friendRequestsCount > 0 && <StCount>{authUser.friendRequestsCount}</StCount>}
          </MenuLink>
          <StMenuItem centered onClick={onOpen}>
            <SettingsIcon size={24} />
          </StMenuItem>
        </StMenu>
        <StFooter>
          <button onClick={toggleTheme}>{isDarkTheme ? <SunIcon size={24} /> : <MoonIcon size={24} />}</button>
          <button onClick={handleLogout}>
            <LogoutIcon size={24} color="red" />
          </button>
        </StFooter>
      </StAside>
      <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile">
        <EditProfileForm onClose={onClose} />
      </Modal>
    </>
  );
};

export default AsidePanel;
