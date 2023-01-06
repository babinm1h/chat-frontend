import React, { FC, PropsWithChildren, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import AsidePanel from '../../AsidePanel';
import Sidebar from './Sidebar';

const StWrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  color: ${({ theme }) => theme.currentTheme.text.primary};
`;

const StContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const Mainlayout: FC<PropsWithChildren> = () => {
  const asideRef = useRef<HTMLDivElement>(null);
  const [asideWidth, setAsideWidth] = useState(0);

  React.useEffect(() => {
    if (!asideRef.current) return;
    setAsideWidth(asideRef.current?.clientWidth);
  }, [asideRef.current]);

  return (
    <StWrapper>
      <AsidePanel asideRef={asideRef} />
      <StContent style={{ paddingLeft: `${asideWidth}px` }}>
        <Sidebar />
        <Outlet />
      </StContent>
    </StWrapper>
  );
};

export default Mainlayout;
