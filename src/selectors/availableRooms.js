// @flow
import { createSelector } from 'reselect';

import type { Room } from '../../apiTypes';
import type { ReduxState } from '../reducers';
import availableBeaconsSelector from './availableBeacons';

// This selector takes the ids of all available beacons and returns all the rooms assigned to it
const availableRoomsSelector: (state: ReduxState) => Room[] = createSelector(
  state => state.data,
  state => availableBeaconsSelector(state),
  (data, availableBeacons) => {
    const { rooms } = data;
    const availableRooms = [];
    availableBeacons.map(ab => ab.assignedRooms.map(ar => availableRooms.push(rooms.byId[ar])));

    return availableRooms;
  }
);

export default availableRoomsSelector;
