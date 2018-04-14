// @flow
import { cardStackReducer } from 'react-native-navigation-redux-helpers';

type CardRoute = {
  key: string,
  index: number,
};

export type NavigationState = {
  key: string,
  index: number,
  routes: CardRoute[],
};

const initialState: NavigationState = {
  key: 'global',
  index: 0,
  routes: [
    {
      key: 'home',
      index: 0,
    },
  ],
};

export default cardStackReducer(initialState);
