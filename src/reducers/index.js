// @flow
import { combineReducers } from 'redux';

import type { AppState } from './app';
import type { RoomDataState } from './roomData';

import app from './app';
import roomData from './roomData';

export type ReduxState = {
  app: AppState,
  roomData: RoomDataState,
};

export default combineReducers({
  app,
  roomData,
});
