import React from "react";
import styled from "styled-components";
import { useSidebar } from "../../hooks/componentsHooks/useSidebar";
import SidebarHeader from "./SidebarHeader";
import SidebarUser from "./SidebarUser";

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
  const { isFetching, dialogs, activeDialogId, handleSetActiveDialog, authUser } = useSidebar();

  if (isFetching || !authUser) {
    return <>Loading</>;
  }

  return (
    <StSidebar>
      <SidebarHeader name={authUser.firstName + " " + authUser.lastName} />
      <StUsersList>
        {dialogs.map((d) => (
          <SidebarUser
            key={d.id}
            dialog={d}
            authUserId={authUser.id}
            activeDialogId={activeDialogId}
            handleSetActiveDialog={handleSetActiveDialog}
          />
        ))}
      </StUsersList>
    </StSidebar>
  );
};

export default Sidebar;
