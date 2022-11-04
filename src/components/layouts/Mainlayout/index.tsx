import React, { FC, PropsWithChildren } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";

const StWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  color: ${({ theme }) => theme.currentTheme.text.primary};
`;

const Mainlayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <StWrapper>
      <Sidebar />
      {children}
    </StWrapper>
  );
};

export default Mainlayout;
