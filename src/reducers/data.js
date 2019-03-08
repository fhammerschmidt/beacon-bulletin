// @flow
import keyBy from 'lodash/keyBy';
import flatten from 'lodash/flatten';

import type { Beacon, Room } from '../../common/apiTypes';
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
    case 'POST_BEACON_SUCCESS':
      return {
        ...state,
        beacons: {
          ...state.beacons,
          ids: [...state.beacons.ids, action.beacon.id],
          byId: { ...state.beacons.byId, [action.beacon.id]: action.beacon },
        },
      };
    default:
      return state;
  }
}

export function roomSelector(state: ReduxState, roomId: string): Room {
  return state.data.rooms.byId[roomId];
}

export function roomListSelector(state: ReduxState): Array<Room> {
  return state.data.rooms.ids.map(id => state.data.rooms.byId[id]);
}

export function beaconListSelector(state: ReduxState): Array<Beacon> {
  return state.data.beacons.ids.map(id => state.data.beacons.byId[id]);
}

export function roomsWithBeaconsSelector(state: ReduxState): Array<Room> {
  const roomIdsWithBeacons = new Set(flatten(beaconListSelector(state).map(b => b.assignedRooms)));
  return roomListSelector(state).filter(room => roomIdsWithBeacons.has(room.name));
}

export function roomsWithNoBeaconsSelector(state: ReduxState): Array<Room> {
  const roomIdsWithBeacons = new Set(flatten(beaconListSelector(state).map(b => b.assignedRooms)));
  return roomListSelector(state).filter(room => !roomIdsWithBeacons.has(room.name));
}
