// @flow
import type { Booking } from '../../apiTypes';
import type { Action } from '../actions';
import type { ReduxState } from '.';

export type BookingMap = { [roomId: string]: Array<Booking> };
export type TimeslotMap = { [roomId: string]: Array<string> };

export type TempState = {
  bookings: BookingMap,
  timeslots: TimeslotMap,
};

const initialState = {
  bookings: {},
  timeslots: {},
};

export default function temp(state: TempState = initialState, action: Action): TempState {
  switch (action.type) {
    case 'FETCH_BOOKINGS_SUCCESS': {
      const { roomId, bookings } = action;
      return {
        ...state,
        bookings:
          bookings && bookings.length > 0
            ? {
                ...state.bookings,
                [roomId]: bookings,
              }
            : state.bookings,
      };
    }
    case 'POST_BOOKING_SUCCESS': {
      const { booking } = action;
      return {
        ...state,
        bookings: {
          ...state.bookings,
          [booking.roomId]: [...state.bookings[booking.roomId], booking],
        },
        timeslots: {
          ...state.timeslots,
          [booking.roomId]: state.timeslots[booking.roomId].filter(t => t !== booking.start),
        },
      };
    }
    case 'FETCH_TIMESLOTS_SUCCESS': {
      const { roomId, timeslots } = action;
      return {
        ...state,
        timeslots:
          timeslots && timeslots.length > 0
            ? {
                ...state.timeslots,
                [roomId]: timeslots,
              }
            : state.timeslots,
      };
    }
    default:
      return state;
  }
}

export function bookingsForRoomSelector(state: ReduxState, roomId: string): Booking[] {
  const bookings = state.temp.bookings[roomId];
  if (bookings && bookings.length > 0) {
    return bookings;
  }
  return [];
}

export function timeslotsForRoomSelector(state: ReduxState, roomId: string): string[] {
  const timeslots = state.temp.timeslots[roomId];
  if (timeslots && timeslots.length > 0) {
    return timeslots;
  }
  return [];
}
