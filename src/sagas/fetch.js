// @flow
import merge from 'lodash/merge';

import type { ReduxState } from '../reducers';
import { select, call } from 'redux-saga/effects';

export default function* fetchSaga(path: string, fetchOptions?: Object): Generator<*, *, *> {
  const serverUrl: string = yield select((state: ReduxState) => state.app.serverUrl);
  const url = `${serverUrl}/${path}`;
  const optionsWithToken = merge(
    {
      headers: {
        Accept: 'application/json',
      },
    },
    fetchOptions
  );

  return yield call(performFetch, url, optionsWithToken);
}

function performFetch(url, options) {
  return fetch(url, options).then(response => {
    if (response.ok) {
      if (options.headers.Accept === 'application/json') {
        return response.json();
      } else {
        return response.text();
      }
    } else {
      return Promise.reject(new Error(`${response.status}`));
    }
  });
}
