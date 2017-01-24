// @flow
import type { Beacon, Room } from '../reducers/data';

export type DataAction =
| {| type: 'FETCH_BEACONS' |}
| {| type: 'FETCH_BEACONS_STARTED' |}
| {| type: 'FETCH_BEACONS_SUCCESS', beacons: Beacon[] |}
| {| type: 'FETCH_BEACONS_ERROR', error: Object |}
| {| type: 'FETCH_ROOMS' |}
| {| type: 'FETCH_ROOMS_STARTED' |}
| {| type: 'FETCH_ROOMS_SUCCESS', rooms: Room[] |}
| {| type: 'FETCH_ROOMS_ERROR', error: Object |}
| {| type: 'STORE_RANGED_BEACONS', beacons: Beacon[] |}
;

export function fetchBeacons(): DataAction {
  return { type: 'FETCH_BEACONS' };
}

export function fetchBeaconsStarted(): DataAction {
  return { type: 'FETCH_BEACONS_STARTED' };
}

export function fetchBeaconsSuccess(beacons: Beacon[]): DataAction {
  return { type: 'FETCH_BEACONS_SUCCESS', beacons };
}

export function fetchBeaconsError(error: Object): DataAction {
  return { type: 'FETCH_BEACONS_ERROR', error };
}

export function fetchRooms(): DataAction {
  return { type: 'FETCH_ROOMS' };
}

export function fetchRoomsStarted(): DataAction {
  return { type: 'FETCH_ROOMS_STARTED' };
}

export function fetchRoomsSuccess(rooms: Room[]): DataAction {
  return { type: 'FETCH_ROOMS_SUCCESS', rooms };
}

export function fetchRoomsError(error: Object): DataAction {
  return { type: 'FETCH_ROOMS_ERROR', error };
}
