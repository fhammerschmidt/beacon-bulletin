// @flow

type Booking = {
  day: string,
  start: string,
  duration: number,
  roomId: string,
};

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

export default function findTimeslots(bookings: Booking[], date: string) {
  const bookingsOfDate = bookings.filter(booking => booking.day === date);
  const newDate = new Date();
  const isToday = date === newDate.toISOString().split('T')[0];
  const minutesToday = newDate.getHours() * 60 + newDate.getMinutes();

  const availableTimeslots = timeslotsInNumbers.filter(
    ts =>
      (isToday && minutesToday < ts) ||
      bookingsOfDate
        .map(bod => ts < timestringToNumber(bod.start) || ts >= timestringToNumber(bod.start) + bod.duration)
        .every(val => val === true)
  );

  return availableTimeslots.map(ts => numberToTimestring(ts));
}
