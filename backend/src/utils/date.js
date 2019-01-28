// @flow
const DEFAULT_TIMEZONE_OFFSET = 60 * 60000; // milliseconds

export const getDateWithOffset = (date: Date) => {
  return new Date(date.getTime() + DEFAULT_TIMEZONE_OFFSET);
};

export const getDateString = (date: Date) => {
  const newDate = getDateWithOffset(date);
  return newDate.toISOString().split('T')[0];
};
