import cn from 'classnames';
import { Dayjs } from 'dayjs';
import React, { FC } from 'react';
import styled from 'styled-components';
import { getMonthName } from '../../../utils/date.helpers';

const StDay = styled.div<{ isDisabled: boolean }>`
  padding: 15px;
  min-height: 100px;
  background-color: ${({ theme }) => theme.currentTheme.background.primary};
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  ${({ isDisabled, theme }) =>
    isDisabled &&
    `
    pointer-events:none;
    color: ${theme.currentTheme.text.disabled};
  `}
  span {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 30px;
    height: 30px;
  }
  &.selected {
    span {
      background-color: ${({ theme }) => theme.colors.common.primaryBlue};
    }
  }
`;

interface IProps {
  date: Dayjs;
  currentMonth: number;
  selectedDay: string;
  handleSelect: (formated: string) => void;
}

const DayCell: FC<IProps> = ({ date, currentMonth, selectedDay, handleSelect }) => {
  const formattedDate = date.format('DD.MM.YYYY');
  const isSelected = formattedDate === selectedDay;
  const isDisabled = getMonthName(currentMonth) !== getMonthName(date.month());

  return (
    <StDay isDisabled={isDisabled} className={cn({ selected: isSelected })} onClick={() => handleSelect(formattedDate)}>
      <span>{date.format('DD')}</span>
    </StDay>
  );
};

export default DayCell;
