// @flow
import { type Beacon } from '../../common/apiTypes';
import { postBeaconStarted, postBeaconSuccess, postBeaconError } from '../actions';
import fetchSaga from './fetch';
import { take, put, fork } from 'redux-saga/effects';

export default function* postBeaconSaga(): Generator<*, *, *> {
  yield fork(doPostBeacon);
}

function* doPostBeacon(): Generator<*, *, *> {
  while (true) {
    const action = yield take('POST_BEACON');
    yield put(postBeaconStarted());

    try {
      const beacons: Beacon[] = yield* fetchSaga('beacons', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify([action.beacon]),
      });
      yield put(postBeaconSuccess(beacons[0]));
    } catch (error) {
      yield put(postBeaconError(error));
    }
  }
}
