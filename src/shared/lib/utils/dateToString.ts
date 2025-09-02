import { DateRange } from 'react-day-picker';

export const getDateString = (date: Date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const getDateRangeString = (date: DateRange) => {
  const dateFrom = date.from && getDateString(date.from);
  const dateTo = date.to && getDateString(date.to);
  return `${dateFrom} - ${dateTo}`;
};
