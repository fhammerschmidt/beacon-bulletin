// @flow
import { AsyncStorage } from 'react-native';

import type { Action } from '../actions';
import type { ReduxState } from '../reducers';

const logBlacklist = [ 'DUMMY_ACTION' ];

export default {
  persist: {
    storage: AsyncStorage,
    // Subtrees of the following reducers are persisted
    whitelist: [ 'navigation' ],
  },
  logger: {
    //
    predicate: (getState: (() => ReduxState), action: Action) => logBlacklist.indexOf(action.type) === -1,
  },
};
