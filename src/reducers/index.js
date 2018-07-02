// @flow
import { combineReducers } from 'redux';

import type { AppState } from './app';
import type { DataState } from './data';

import app from './app';
import data from './data';

export type ReduxState = {
  app: AppState,
  data: DataState,
};

export default combineReducers({
  app,
  data,
});
