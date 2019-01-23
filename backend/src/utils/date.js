// @flow
const DEFAULT_TIMEZONE_OFFSET = 60 * 60000; // milliseconds

export const getDateString = (date: Date) => {
  const newDate = new Date(date.getTime() + DEFAULT_TIMEZONE_OFFSET);
  return newDate.toISOString().split('T')[0];
};
