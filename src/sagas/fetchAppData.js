// @flow
import type { Beacon, Room, Booking } from '../../apiTypes';
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
import { take, put, fork } from 'redux-saga/effects';

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

function* doFetchTimeslots(): Generator<*, *, *> {
  while (true) {
    const action = yield take('FETCH_TIMESLOTS');
    yield put(fetchTimeslotsStarted());

    try {
      const timeslots: string[] = yield* fetchSaga(`timeslots/${action.roomId}`);
      yield put(fetchTimeslotsSuccess(action.roomId, timeslots));
    } catch (error) {
      yield put(fetchTimeslotsError(error));
    }
  }
}
