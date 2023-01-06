import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const StEmpty = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.currentTheme.background.primary}; ;
`;

const DialogsPage = () => {
  return (
    <StEmpty>
      <Outlet />
    </StEmpty>
  );
};

export default DialogsPage;
