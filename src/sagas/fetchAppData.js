// @flow
import type { Beacon, Room } from '../../apiTypes';
import {
  fetchRooms,
  fetchRoomsStarted,
  fetchRoomsSuccess,
  fetchRoomsError,
  fetchBeacons,
  fetchBeaconsStarted,
  fetchBeaconsSuccess,
  fetchBeaconsError,
} from '../actions';
import fetchSaga from './fetch';
import { take, put, fork } from 'redux-saga/effects';

export default function* fetchAppDataSaga(): Generator<*, *, *> {
  yield fork(doFetchRooms());
  yield fork(doFetchBeacons());

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
