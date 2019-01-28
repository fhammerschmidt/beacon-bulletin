// @flow
import { type Dispatch, setStartupState } from '../actions';
import fetchAppDataSaga from './fetchAppData';
import postBookingSaga from './postBooking';
import postBeaconSaga from './postBeacon';
import { take, put } from 'redux-saga/effects';

export default function* rootSaga(_dispatch: Dispatch): Generator<*, *, *> {
  // Wait for state restoration to complete.
  yield take('PERSIST_BOOTSTRAPPED');

  // Start loading app with store.
  yield put(setStartupState('FetchAppData'));
  yield* fetchAppDataSaga();
  yield* postBookingSaga();
  yield* postBeaconSaga();

  // App start and fetching room and booking data is complete.
  yield put(setStartupState('Complete'));
}
