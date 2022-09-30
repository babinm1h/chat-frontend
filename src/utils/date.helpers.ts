import dayjs from "dayjs";

export const getMessageDate = (date: Date) => {
  return dayjs(date).format("H:MM");
};
