import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export const getMessageTime = (date?: Date) => {
  if (!date) return;
  return dayjs(date).format('HH:mm');
};

export const getMonthDays = (month = dayjs().month()) => {
  month = Math.floor(month);

  const year = dayjs().year();
  const firstDayOfMonth = dayjs(new Date(year, month, 0)).day();

  let currMonth = 0 - firstDayOfMonth;

  const daysMatrix = new Array(5).fill('').map(() =>
    new Array(7).fill('').map(() => {
      currMonth++;
      return dayjs(new Date(year, month, currMonth));
    }),
  );

  return daysMatrix;
};

export const getMonthName = (month: number) => {
  return dayjs(new Date(dayjs().year(), month)).format('MMMM');
};

export const getFormattedHours = () => {
  const hrs = [];
  for (let i = 0; i < 24; i++) {
    hrs.push(dayjs().hour(i).format('HH:00'));
  }
  return hrs;
};

export const formatDate = (format: string, initDate?: Date | string) => {
  return initDate ? dayjs(initDate).format(format) : dayjs().format(format);
};
