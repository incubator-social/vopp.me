import { DateRange } from 'react-day-picker';

export const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const formatDateRange = (date: DateRange) => {
  const dateFrom = date.from && formatDate(date.from);
  const dateTo = date.to && formatDate(date.to);
  return `${dateFrom} - ${dateTo}`;
};
