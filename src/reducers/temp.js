// @flow
import keyBy from 'lodash/keyBy';

import type { Booking } from '../../apiTypes';
import type { Action } from '../actions';

export type BookingMap = { [bookingId: string]: Booking };

export type BookingData = {
  byId: BookingMap,
  ids: string[],
};

export type TempState = {
  bookings: BookingData,
};

const initialState = {
  bookings: {
    byId: {},
    ids: [],
  },
};

export default function temp(state: TempState = initialState, action: Action): TempState {
  switch (action.type) {
    case 'FETCH_BOOKINGS_SUCCESS': {
      return {
        ...state,
        bookings: {
          ids: action.bookings.map(b => b.id),
          byId: keyBy(action.bookings, 'id'),
        },
      };
    }
    case 'FETCH_BOOKING_SUCCESS': {
      return {
        ...state,
        bookings: {
          ids: [...state.bookings.ids, action.booking.id],
          byId: { ...state.bookings.byId, [action.booking.id]: action.booking },
        },
      };
    }
    default:
      return state;
  }
}
