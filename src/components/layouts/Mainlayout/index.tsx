import React, { FC, PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './Sidebar';

const StWrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  color: ${({ theme }) => theme.currentTheme.text.primary};
`;

const Mainlayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <StWrapper>
      <Sidebar />
      <Outlet />
    </StWrapper>
  );
};

export default Mainlayout;
