// @flow
import type { Booking } from '../../apiTypes';
import type { Action } from '../actions';
import type { ReduxState } from '.';

export type BookingMap = { [roomId: string]: Array<Booking> };

export type TempState = {
  bookings: BookingMap,
};

const initialState = {
  bookings: {},
};

export default function temp(state: TempState = initialState, action: Action): TempState {
  switch (action.type) {
    case 'FETCH_BOOKINGS_SUCCESS': {
      const { roomId, bookings } = action;
      return {
        ...state,
        bookings: {
          ...state.bookings,
          [roomId]: bookings,
        },
      };
    }
    default:
      return state;
  }
}

export function bookingsForRoomSelector(state: ReduxState, roomId: string): Booking[] {
  const bookings = state.temp.bookings[roomId];
  if (bookings.length > 0) {
    return bookings;
  }
  return [];
}
