import React from "react";
import styled from "styled-components";
import { useSidebar } from "../../hooks/componentsHooks/useSidebar";
import DialogsList from "./DialogsList";
import FoundUsersList from "./FoundUsersList";
import SidebarHeader from "./SidebarHeader";

const StSidebar = styled.aside`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: relative;
  width: 400px;
  background-color: ${({ theme }) => theme.currentTheme.background.secondary};
  height: 100%;
  overflow-y: auto;
  border-right: 1px solid ${({ theme }) => theme.currentTheme.background.primary};
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.currentTheme.background.scrollThumb};
    width: 6px;
    border-radius: 999px;
    opacity: 0.2;
  }
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.currentTheme.background.scrollTrack};
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
  } = useSidebar();

  if (isDialogsFetching || !authUser) {
    return <>Loading</>;
  }

  return (
    <StSidebar>
      <SidebarHeader name={authUser.firstName + " " + authUser.lastName} searchMode={searchMode} />
      <StUsersList>
        {searchMode ? (
          <FoundUsersList foundUsers={foundUsers} />
        ) : (
          <DialogsList
            dialogs={dialogs}
            activeDialogId={activeDialogId}
            authUserId={authUser.id}
          />
        )}
      </StUsersList>
    </StSidebar>
  );
};

export default Sidebar;
