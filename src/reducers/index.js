// @flow
import { combineReducers, type CombinedReducer } from 'redux';
import { AsyncStorage } from 'react-native';
import { persistReducer } from 'redux-persist';

import type { AppState } from './app';
import type { DataState } from './data';

import app from './app';
import data from './data';

function persist<R: any>(key: string, reducer: R, extraConfig?: Object): R {
  const persistConfig = { key, storage: AsyncStorage, ...extraConfig };
  return (persistReducer(persistConfig, reducer): any);
}

export type ReduxState = {
  app: AppState,
  data: DataState,
};

export function makeRootReducer(): CombinedReducer<ReduxState, {}> {
  return combineReducers({
    app,
    data: persist('data', data),
  });
}
