// @flow
export type Action =
| AppAction;

// General app actions
type AppAction =
| {| type: 'SET_NETWORK_ONLINE', online: boolean |}
| {| type: 'ENABLE_BLUETOOTH', bluetooth: boolean |}
| {| type: 'SET_APP_STATE', appState: string |};

export function setNetworkOnline(online: boolean): AppAction {
  return { type: 'SET_NETWORK_ONLINE', online };
}

export function enableBluetooth(bluetooth: boolean): AppAction {
  return { type: 'ENABLE_BLUETOOTH', bluetooth };
}

export function setAppState(appState: string): AppAction {
  return { type: 'SET_APP_STATE', appState };
}
