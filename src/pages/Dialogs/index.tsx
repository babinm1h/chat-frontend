import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../../components/Sidebar";

const StWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  color: ${({ theme }) => theme.currentTheme.text.primary};
`;

const StEmpty = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.currentTheme.background.primary}; ;
`;

const DialogsPage = () => {
  return (
    <StWrapper>
      <Sidebar />
      <StEmpty>
        <Outlet />
      </StEmpty>
    </StWrapper>
  );
};

export default DialogsPage;
