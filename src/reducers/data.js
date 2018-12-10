// @flow
import keyBy from 'lodash/keyBy';
import type { Beacon, Room } from '../../apiTypes';
import type { Action } from '../actions';

export type DataState = {
  rooms: {
    byId: RoomMap,
    ids: string[],
  },
  beacons: {
    byId: BeaconMap,
    ids: string[],
  },
  rangedBeacons: string[],
};

export type RoomMap = { [roomId: string]: Room };
export type BeaconMap = { [beaconId: string]: Beacon };

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
