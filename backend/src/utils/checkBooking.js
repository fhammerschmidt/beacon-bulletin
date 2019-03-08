// @flow
import type { ApiBooking } from '../../../common/apiTypes';

const stringIsValid = (str: string) => Boolean(str) && str.length > 0;

const dateIsValid = (day: string, start: string) => {
  const now = new Date();
  const bookingDate = new Date(`${day}T${start}:00Z`);
  return stringIsValid(day) && stringIsValid(start) && bookingDate > now;
};

const durationIsValid = (duration: number) => duration >= 30 && duration <= 120;

export default function checkBooking({ day, start, duration, roomId }: ApiBooking): boolean {
  return dateIsValid(day, start) && stringIsValid(roomId) && durationIsValid(duration);
}
