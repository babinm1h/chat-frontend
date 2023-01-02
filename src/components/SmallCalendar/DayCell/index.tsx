import React, { FC } from 'react';
import styled from 'styled-components';
import { getMonthName } from '../../../utils/date.helpers';

const StDay = styled.span<{ isSelected: boolean; isDisabled: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 14px;
  ${({ theme, isSelected }) =>
    isSelected &&
    `
    background-color: ${theme.colors.common.primaryBlue};
  `}
  ${({ theme, isDisabled }) =>
    isDisabled &&
    `
    color: ${theme.currentTheme.text.disabled};
    pointer-events:none;
    background-color: transparent;
  `}
`;

interface IProps {
  formattedDate: string;
  day: string;
  selectedDate: string;
  handleSelect: (formattedDate: string) => void;
  currentMonth: number;
  monthNum: number;
}

const DayCell: FC<IProps> = ({ day, formattedDate, selectedDate, handleSelect, currentMonth, monthNum }) => {
  const isSelected = selectedDate === formattedDate;
  const isDisabled = getMonthName(currentMonth) !== getMonthName(monthNum);

  const onItemClick = () => {
    if (isSelected) return;
    handleSelect(formattedDate);
  };

  return (
    <StDay isSelected={isSelected} onClick={onItemClick} isDisabled={isDisabled}>
      {day}
    </StDay>
  );
};

export default DayCell;
