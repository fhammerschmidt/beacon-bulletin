// @flow
import { type Booking } from '../../apiTypes';
import { postBookingStarted, postBookingSuccess, postBookingError } from '../actions';
import fetchSaga from './fetch';
import { take, put, fork } from 'redux-saga/effects';

export default function* postBookingSaga(): Generator<*, *, *> {
  yield fork(doPostBooking);
}

function* doPostBooking(): Generator<*, *, *> {
  while (true) {
    const action = yield take('POST_BOOKING');
    yield put(postBookingStarted());

    try {
      const booking: Booking = yield* fetchSaga('bookings', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(action.booking),
      });
      yield put(postBookingSuccess(booking));
    } catch (error) {
      yield put(postBookingError(error));
    }
  }
}
