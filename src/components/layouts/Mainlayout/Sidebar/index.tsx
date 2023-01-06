import React from 'react';
import styled from 'styled-components';
import { useSidebar } from '../../../../hooks/componentsHooks/useSidebar';
import { scrollbarMixin } from '../../../../styles/common/mixins';
import DialogsList from './DialogsList';
import FoundUsersList from './FoundUsersList';
import GroupDialogsList from './GroupDialogsList';
import SidebarHeader from './SidebarHeader';

const StSidebar = styled.aside`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: relative;
  width: 380px;
  background-color: ${({ theme }) => theme.currentTheme.background.secondary};
  height: 100%;
  overflow-y: auto;
  border-right: 1px solid ${({ theme }) => theme.currentTheme.background.primary};
  ${scrollbarMixin()}
  @media (max-width:1280px) {
    width: 320px;
  }
  @media (max-width: 1024px) {
    width: 250px;
  }
`;

const StUsersList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const Sidebar = () => {
  const {
    isDialogsFetching,
    dialogs,
    activeDialogId,
    authUser,
    foundUsers,
    isSearching,
    searchMode,
    groupDialogs,
    isGroupDialogsFetching,
    activeTab,
    setActiveTab,
  } = useSidebar();

  if (isDialogsFetching || !authUser) {
    return <>Loading</>;
  }

  return (
    <StSidebar>
      <SidebarHeader authUser={authUser} searchMode={searchMode} activeTab={activeTab} setActiveTab={setActiveTab} />
      <StUsersList>
        {searchMode ? (
          <FoundUsersList foundUsers={foundUsers} />
        ) : activeTab === 1 ? (
          <DialogsList dialogs={dialogs} activeDialogId={activeDialogId} authUserId={authUser.id} />
        ) : (
          <GroupDialogsList
            activeDialogId={activeDialogId}
            isGroupDialogsFetching={isGroupDialogsFetching}
            groupDialogs={groupDialogs}
          />
        )}
      </StUsersList>
    </StSidebar>
  );
};

export default Sidebar;
