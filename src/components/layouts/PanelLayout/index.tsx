import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import AsidePanel from '../../AsidePanel';

const StWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  color: ${({ theme }) => theme.currentTheme.text.primary};
`;

const StMain = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  flex: 1 1 auto;
  padding-left: 70px;
`;

const PanelLayout = () => {
  return (
    <StWrapper>
      <AsidePanel />
      <StMain>
        <Outlet />
      </StMain>
    </StWrapper>
  );
};

export default PanelLayout;
