// @flow
import type { ApiBooking } from '../../../apiTypes';

const stringIsValid = (str: string) => Boolean(str) && str.length > 0;

const durationIsValid = (duration: number) => duration >= 30 && duration <= 120;

export default function checkBooking({ day, start, duration, roomId }: ApiBooking): boolean {
  return stringIsValid(day) && stringIsValid(start) && stringIsValid(roomId) && durationIsValid(duration);
}
