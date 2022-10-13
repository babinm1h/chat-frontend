import dayjs from "dayjs";

export const getMessageDate = (date?: Date) => {
  if (!date) return;
  return dayjs(date).format("HH:mm");
};
