// @flow
import { combineReducers } from 'redux';

import type { AppState } from './app';
import type { DataState } from './data';
import type { NavigationState } from './navigation';
import type { NavigationTabsState } from './navigationTabs';

import app from './app';
import data from './data';
import navigation from './navigation';
import navigationTabs from './navigationTabs';

export type ReduxState = {
  app: AppState,
  data: DataState,
  navigation: NavigationState,
  navigationTabs: NavigationTabsState,
};

export default combineReducers({
  app,
  data,
  navigation,
  navigationTabs,
});
