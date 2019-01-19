// @flow
import keyBy from 'lodash/keyBy';

import type { Beacon, Room } from '../../apiTypes';
import type { Action } from '../actions';
import type { ReduxState } from '.';

export type RoomMap = { [roomId: string]: Room };
export type BeaconMap = { [beaconId: string]: Beacon };

export type RoomData = {
  byId: RoomMap,
  ids: string[],
};

export type BeaconData = {
  byId: BeaconMap,
  ids: string[],
};

export type DataState = {
  rooms: RoomData,
  beacons: BeaconData,
  rangedBeacons: string[],
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

export default function data(state: DataState = initialState, action: Action): DataState {
  switch (action.type) {
    case 'FETCH_BEACONS_SUCCESS': {
      return {
        ...state,
        beacons: {
          ids: action.beacons.map(b => b.id),
          byId: keyBy(action.beacons, 'id'),
        },
      };
    }
    case 'FETCH_ROOMS_SUCCESS':
      return {
        ...state,
        rooms: {
          ids: action.rooms.map(b => b.id),
          byId: keyBy(action.rooms, 'id'),
        },
      };
    default:
      return state;
  }
}

export function roomSelector(state: ReduxState, roomId: string): Room {
  console.log(state.data.rooms, roomId);
  return state.data.rooms.byId[roomId];
}
