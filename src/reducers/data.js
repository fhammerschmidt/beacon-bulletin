// @flow
import keyBy from 'lodash/keyBy';
import type { Action } from '../actions';

export type DataState = {
  rooms: {
    byId: RoomMap,
    ids: number[],
  },
  beacons: {
    byId: BeaconMap,
    ids: number[],
  },
  rangedBeacons: number[],
};

export type RoomMap = { [roomId: number]: Room };
export type BeaconMap = { [beaconId: number]: Beacon };

export type Room = {
  id: number,
  building: string,
  level: string,
  fullName: string,
};

export type Beacon = {
  id: number, // Not the beacon UUID!
  region: string,
  major: number,
  minor: number,
  assignedRooms: number[],
};

const initialState: DataState = {
  rooms: {
    byId: {},
    ids: [],
  },
  beacons: {
    byId: {},
    ids: [],
  },
  rangedBeacons: [], // current beacons ids in range
};

export default function app(state: DataState = initialState, action: Action): DataState {
  switch (action.type) {
    case 'FETCH_BEACONS_SUCCESS':
      return {
        ...state,
        beacons: {
          ids: action.beacons.map(b => b.id),
          byId: keyBy(action.beacons, 'id'),
        },
      };
    case 'FETCH_ROOMS_SUCCESS':
      return {
        ...state,
        rooms: {
          ids: action.rooms.map(b => b.id),
          byId: keyBy(action.rooms, 'id'),
        },
      };
    case 'RESET_APPLICATION':
      return initialState;
    default:
      return state;
  }
}
