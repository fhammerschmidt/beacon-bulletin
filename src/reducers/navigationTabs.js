// @flow
import { tabReducer } from 'react-native-navigation-redux-helpers';

export type TabRoute = {
  key: string,
  icon: string,
  title: string,
};

export type NavigationTabsState = {
  key: string,
  index: number,
  routes: TabRoute[],
}

const initialState: NavigationTabsState = {
  key: 'tabs',
  index: 0,
  routes: [
    { key: 'beacons', icon: 'settings_input_antenna', title: 'Beacons' },
    { key: 'rooms', icon: 'account_balance', title: 'Rooms' },
    { key: 'settings', icon: 'tune', title: 'Settings' },
  ],
};

export default tabReducer(initialState);
