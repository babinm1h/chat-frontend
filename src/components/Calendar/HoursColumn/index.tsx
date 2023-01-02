import React, { FC } from 'react';
import styled from 'styled-components';

interface IProps {
  allHours: string[];
}

const StColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 60px;
  font-size: 12px;
  border-right: 1px solid ${({ theme }) => theme.currentTheme.background.border};
  min-height: 100%;
`;

const StHour = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 60px;
`;

const HoursColumn: FC<IProps> = ({ allHours }) => {
  return (
    <StColumn>
      {allHours.map((h) => (
        <StHour key={h}>{h}</StHour>
      ))}
    </StColumn>
  );
};

export default HoursColumn;
