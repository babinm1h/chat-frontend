import dayjs, { Dayjs } from 'dayjs';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { NextIcon, PrevIcon } from '../../assets/icons';
import { scrollbarMixin } from '../../styles/common/mixins';
import { formatDate, getFormattedHours, getMonthDays } from '../../utils/date.helpers';
import SmallCalendar from '../SmallCalendar';
import DayCell from './DayCell';
import HoursColumn from './HoursColumn';

const StWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 15px;
  gap: 50px;
`;

const StDaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  grid-template-rows: repeat(5, minmax(0, 1fr));
  background-color: ${({ theme }) => theme.colors.common.gray};
  grid-row-gap: 2px;
  grid-column-gap: 2px;
  border: 1px solid ${({ theme }) => theme.colors.common.gray}; ;
`;

const StControl = styled.button`
  color: currentColor;
  background-color: transparent;
  padding: 0 5px;
  opacity: 0.8;
  transition: all 0.2s ease-in-out;
  &:hover {
    opacity: 1;
  }
  &:disabled {
    opacity: 0.5;
  }
`;

const StHeader = styled.div`
  width: 100%;
  display: flex;
  padding: 10px;
  gap: 20px;
`;

const StControls = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const StDaysRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  border: 1px solid ${({ theme }) => theme.colors.common.gray};
  border-bottom: none;
`;

const StDay = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: center;
`;

const StTitle = styled.div`
  font-weight: 500;
  font-size: 16px;
`;

const StMain = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StMainContent = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  ${scrollbarMixin()};
`;

const StAside = styled.aside`
  font-weight: 500;
  font-size: 16px;
`;

const StHourRows = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StHourRow = styled.div`
  height: 60px;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.currentTheme.background.border};
`;

const daysArr = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'St', 'Sn'];

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState<number>(dayjs().month());
  const [selected, setSelected] = useState(formatDate(new Date()));

  const currentTitle = dayjs(new Date(dayjs().year(), currentMonth)).format('MMMM YYYY');

  const monthDays = useMemo(() => {
    return getMonthDays(currentMonth);
  }, [currentMonth]);

  const handlePrev = () => {
    setCurrentMonth((prev) => prev - 1);
  };

  const handleNext = () => {
    setCurrentMonth((prev) => prev + 1);
  };

  const handleSelect = (formatedDate: string) => {
    setSelected(formatedDate);
  };

  const allHours = useMemo(() => {
    return getFormattedHours();
  }, []);

  return (
    <StWrapper>
      <StAside>
        <SmallCalendar />
      </StAside>
      <StMain>
        {/* <StHeader>
          <StControls>
            <StControl>
              <PrevIcon onClick={handlePrev} size={22} />
            </StControl>
            <StControl>
              <NextIcon onClick={handleNext} size={22} />
            </StControl>
          </StControls>
          <StTitle>{currentTitle}</StTitle>
        </StHeader>
        <StDaysRow>
          {daysArr.map((d) => (
            <StDay key={d}>{d}</StDay>
          ))}
        </StDaysRow>
        <StDaysGrid>
          {monthDays.map((d) =>
            d.map((day, idx) => {
              return (
                <DayCell
                  date={day}
                  key={idx}
                  currentMonth={currentMonth}
                  selectedDay={selected}
                  handleSelect={handleSelect}
                />
              );
            }),
          )}
        </StDaysGrid> */}

        <StMainContent>
          <HoursColumn allHours={allHours} />
          <StHourRows>
            {allHours.map((h) => (
              <StHourRow key={h}></StHourRow>
            ))}
          </StHourRows>
        </StMainContent>
      </StMain>
    </StWrapper>
  );
};

export default Calendar;
