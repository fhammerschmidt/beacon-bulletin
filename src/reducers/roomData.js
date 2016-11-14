// @flow
import type { Action } from '../actions';

export type RoomDataState = {
  rooms: Room[],
};

export type Room = {
  id: number,
  building: string,
  level: string,
  fullName: string,
};

const initialState: RoomDataState = {
  rooms: [],
};

export default function app(state: RoomDataState = initialState, action: Action): RoomDataState {
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
