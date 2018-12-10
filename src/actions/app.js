// @flow
import type { ApplicationState, StartupState } from '../reducers/app';

export type AppAction =
  | {| type: 'SET_NETWORK_ONLINE', online: boolean |}
  | {| type: 'ENABLE_BLUETOOTH', bluetooth: boolean |}
  | {| type: 'SET_APP_STATE', applicationState: ApplicationState |}
  | {| type: 'SET_STARTUP_STATE', startupState: StartupState |}
  | {| type: 'RANGE_FOR_BEACONS', ranging: boolean |};

export function setNetworkOnline(online: boolean): AppAction {
  return { type: 'SET_NETWORK_ONLINE', online };
}

export function enableBluetooth(bluetooth: boolean): AppAction {
  return { type: 'ENABLE_BLUETOOTH', bluetooth };
}

export function setAppState(applicationState: ApplicationState): AppAction {
  return { type: 'SET_APP_STATE', applicationState };
}

export function setStartupState(startupState: StartupState): AppAction {
  return { type: 'SET_STARTUP_STATE', startupState };
}

export function rangeForBeacons(ranging: boolean): AppAction {
  return { type: 'RANGE_FOR_BEACONS', ranging };
}
