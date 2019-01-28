// @flow
import type { ApiBooking } from '../../../apiTypes';
import { getDateWithOffset, getDateString } from './date';

// Time from 08:00 - 17:00
const timeslotsInNumbers = [
  480,
  510,
  540,
  570,
  600,
  630,
  660,
  690,
  720,
  750,
  780,
  810,
  840,
  870,
  900,
  930,
  960,
  990,
  1020,
  1050,
  1080,
];

const zeropad = (str: string) => (str.length === 2 ? str : `0${str}`);
const numberToTimestring = (num: number) =>
  `${zeropad(Math.trunc(num / 60).toString())}:${zeropad((num % 60).toString())}`;

const timestringToNumber = (ts: string) => parseInt(ts.substring(0, 2), 10) * 60 + parseInt(ts.substring(3, 5), 10);

const hasValidTimeslots = (bod: ApiBooking, ts: number) =>
  ts < timestringToNumber(bod.start) || ts >= timestringToNumber(bod.start) + bod.duration;

export default function findTimeslots(bookings: ApiBooking[], date: Date): string[] {
  const dateString = getDateString(date);
  const bookingsOfDate = bookings.filter(booking => booking.day === dateString);
  const newDate = getDateWithOffset(new Date());
  const isToday = dateString === getDateString(newDate);
  const minutesToday = newDate.getHours() * 60 + newDate.getMinutes();

  const availableTimeslots = timeslotsInNumbers.filter(ts => {
    if (isToday) {
      if (bookingsOfDate.length > 0) {
        return bookingsOfDate.map(bod => minutesToday < ts && hasValidTimeslots(bod, ts)).every(val => val === true);
      } else {
        return minutesToday < ts;
      }
    } else {
      return bookingsOfDate.map(bod => hasValidTimeslots(bod, ts)).every(val => val === true);
    }
  });

  return availableTimeslots.map(ts => numberToTimestring(ts));
}
