// @flow
import type { Action } from '../actions';

export type AppState = {
  applicationState: 'inactive' | 'active' | 'background',
  scanningForBeacons: {
    inProgress: boolean,
    error: boolean,
  },
  initializing: boolean,
  networkOnline: boolean,
  bluetooth: boolean,
};

const initialState: AppState = {
  applicationState: 'inactive',
  scanningForBeacons: {
    inProgress: false,
    error: false,
  },
  initializing: true,
  networkOnline: true,
  bluetooth: false,
};

export default function app(state: AppState = initialState, action: Action): AppState {
  switch (action.type) {
    case 'persist/REHYDRATE':
      return { ...state, initializing: false };
    case 'SET_NETWORK_ONLINE':
      return { ...state, networkOnline: action.online };
    case 'ENABLE_BLUETOOTH':
      return { ...state, bluetooth: action.bluetooth };
    case 'RESET_APPLICATION':
      return initialState;
    default:
      return state;
  }
}
