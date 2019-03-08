// @flow
import { Vibration } from 'react-native';

import type { Beacon, Room, Booking } from '../../common/apiTypes';
import { getDateString, timestringToNumber } from '../../common/utils';

import { timeslotsForRoomSelector } from '../reducers/temp';
import {
  fetchRooms,
  fetchRoomsStarted,
  fetchRoomsSuccess,
  fetchRoomsError,
  fetchBeacons,
  fetchBeaconsStarted,
  fetchBeaconsSuccess,
  fetchBeaconsError,
  fetchBookingsStarted,
  fetchBookingsSuccess,
  fetchBookingsError,
  fetchTimeslotsStarted,
  fetchTimeslotsSuccess,
  fetchTimeslotsError,
} from '../actions';
import fetchSaga from './fetch';
import { fork, put, select, take } from 'redux-saga/effects';

export default function* fetchAppDataSaga(): Generator<*, *, *> {
  yield fork(doFetchRooms);
  yield fork(doFetchBeacons);
  yield fork(doFetchBookings);
  yield fork(doFetchTimeslots);

  yield put(fetchRooms());
  yield take('FETCH_ROOMS_SUCCESS');

  yield put(fetchBeacons());
  yield take('FETCH_BEACONS_SUCCESS');
}

function* doFetchRooms(): Generator<*, *, *> {
  while (true) {
    yield take('FETCH_ROOMS');
    yield put(fetchRoomsStarted());

    try {
      const rooms: Room[] = yield* fetchSaga('rooms');
      yield put(fetchRoomsSuccess(rooms));
    } catch (error) {
      yield put(fetchRoomsError(error));
    }
  }
}

function* doFetchBeacons(): Generator<*, *, *> {
  while (true) {
    yield take('FETCH_BEACONS');
    yield put(fetchBeaconsStarted());

    try {
      const beacons: Beacon[] = yield* fetchSaga('beacons');
      yield put(fetchBeaconsSuccess(beacons));
    } catch (error) {
      yield put(fetchBeaconsError(error));
    }
  }
}

function* doFetchBookings(): Generator<*, *, *> {
  while (true) {
    const action = yield take('FETCH_BOOKINGS');
    yield put(fetchBookingsStarted());

    try {
      const bookings: Booking[] = yield* fetchSaga(`bookings/rooms/${action.roomId}`);
      yield put(fetchBookingsSuccess(action.roomId, bookings));
    } catch (error) {
      yield put(fetchBookingsError(error));
    }
  }
}

// eslint-disable-next-line max-statements
function* doFetchTimeslots(): Generator<*, *, *> {
  while (true) {
    // Fetch timeslots after successfully posting a booking, too.
    const action = yield take(['FETCH_TIMESLOTS', 'POST_BOOKING_SUCCESS']);
    yield put(fetchTimeslotsStarted());

    // FETCH_TIMESLOTS: action.roomId / POST_BOOKING_SUCCESS: action.booking.roomId
    let date = null;
    let roomId = null;
    if (action.roomId) {
      roomId = action.roomId;
    } else if (action.booking.roomId) {
      date = action.booking.day;
      roomId = action.booking.roomId;
    } else {
      // This should never happen.
      throw new Error('Room ID for fetching timeslots not found.');
    }

    if (action.date) {
      date = action.date;
    }

    const params = date ? `?date=${date}` : '';

    try {
      const storedTimeslots = yield select(timeslotsForRoomSelector);

      const timeslots: string[] = yield* fetchSaga(`timeslots/${roomId}${params}`);
      const newDate = new Date();
      const minutesToday = newDate.getHours() * 60 + newDate.getMinutes();
      const today = !date || getDateString(new Date()) === date;
      const remainingTimeslots = today ? timeslots.filter(ts => minutesToday < timestringToNumber(ts)) : timeslots;

      if (today && storedTimeslots.length === 0 && remainingTimeslots.length > 0) {
        // Vibrate to notify that there are timeslots available for the nearest room today.
        Vibration.vibrate();
      }

      yield put(fetchTimeslotsSuccess(roomId, remainingTimeslots));
    } catch (error) {
      yield put(fetchTimeslotsError(error));
    }
  }
}
