// @flow
import type { Action } from '../actions';

export type StartupState = 'Rehydrate' | 'Loading' | 'FetchAppData' | 'Complete';

export type ApplicationState = 'active' | 'background' | 'inactive';

export type AppState = {
  +startupState: StartupState,
  +applicationState: ApplicationState,
  +scanningForBeacons: {
    inProgress: boolean,
    error: boolean,
  },
  +initializing: boolean,
  +networkOnline: boolean,
  +bluetooth: boolean,
  +serverUrl: string,
};

const initialState: AppState = {
  startupState: 'Rehydrate',
  applicationState: 'inactive',
  scanningForBeacons: {
    inProgress: false,
    error: false,
  },
  initializing: true,
  networkOnline: true,
  bluetooth: false,
  serverUrl: 'localhost:1337',
};

export default function app(state: AppState = initialState, action: Action): AppState {
  switch (action.type) {
    case 'SET_NETWORK_ONLINE':
      return { ...state, networkOnline: action.online };
    case 'ENABLE_BLUETOOTH':
      return { ...state, bluetooth: action.bluetooth };
    case 'SET_STARTUP_STATE':
      return { ...state, startupState: action.startupState };
    case 'SET_APP_STATE':
      return { ...state, applicationState: action.applicationState };
    default:
      return state;
  }
}
