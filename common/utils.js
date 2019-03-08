// @flow
const DEFAULT_TIMEZONE_OFFSET = 60 * 60000; // milliseconds

export const getDateWithOffset = (date: Date) => {
  return new Date(date.getTime() + DEFAULT_TIMEZONE_OFFSET);
};

export const getDateString = (date: Date) => date.toISOString().split('T')[0];

export const getDateStringWithOffset = (date: Date) => {
  const newDate = getDateWithOffset(date);
  return newDate.toISOString().split('T')[0];
};

export const zeropad = (val: number | string) => {
  let str = val;
  if (typeof val === 'number') {
    str = val.toString();
  }
  return str.length === 2 ? str : `0${str}`;
};

export const numberToTimestring = (num: number) =>
  `${zeropad(Math.trunc(num / 60).toString())}:${zeropad((num % 60).toString())}`;

export const timestringToNumber = (ts: string) =>
  parseInt(ts.substring(0, 2), 10) * 60 + parseInt(ts.substring(3, 5), 10);
