import dayjs from 'dayjs';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { NextIcon, PrevIcon } from '../../assets/icons';
import { formatDate, getMonthDays } from '../../utils/date.helpers';
import DayCell from './DayCell';

const StWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StDays = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-self: flex-start;
`;

const StRow = styled.div`
  display: flex;
  gap: 12px;
`;

const StCurrentTitle = styled.span`
  font-weight: 500;
  font-size: 16px;
`;

const StHeader = styled.div`
  display: flex;
  padding: 12px 0px;
  gap: 20px;
  align-items: center;
  justify-content: space-between;
  align-self: flex-start;
`;

const StControls = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const StControl = styled.button`
  padding: 0 5px;
  color: currentColor;
  opacity: 0.7;
  transition: all 0.2s ease-in-out;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  &:hover {
    opacity: 1;
  }
`;

const SmallCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState<number>(dayjs().month());
  const [selected, setSelected] = useState(formatDate('DD.MM.YYYY', new Date()));

  const handleSelect = (formattedDate: string) => {
    setSelected(formattedDate);
  };

  const currentTitle = useMemo(() => {
    return dayjs(new Date(dayjs().year(), currentMonth)).format('MMMM YYYY');
  }, [currentMonth]);

  const monthDays = useMemo(() => {
    return getMonthDays(currentMonth);
  }, [currentMonth]);

  const handlePrev = () => {
    setCurrentMonth((prev) => prev - 1);
  };

  const handleNext = () => {
    setCurrentMonth((prev) => prev + 1);
  };

  return (
    <StWrapper>
      <div style={{ alignSelf: 'flex-start' }}>
        <StHeader>
          <StCurrentTitle>{currentTitle}</StCurrentTitle>
          <StControls>
            <StControl onClick={handlePrev}>
              <PrevIcon size={16} />
            </StControl>
            <StControl onClick={handleNext}>
              <NextIcon size={16} />
            </StControl>
          </StControls>
        </StHeader>
        <StDays>
          {monthDays.map((d, idx) => (
            <StRow key={idx}>
              {d.map((day, idx) => {
                return (
                  <DayCell
                    key={idx}
                    day={day.format('DD')}
                    formattedDate={day.format('DD.MM.YYYY')}
                    selectedDate={selected}
                    handleSelect={handleSelect}
                    currentMonth={currentMonth}
                    monthNum={day.month()}
                  />
                );
              })}
            </StRow>
          ))}
        </StDays>
      </div>
    </StWrapper>
  );
};

export default SmallCalendar;
