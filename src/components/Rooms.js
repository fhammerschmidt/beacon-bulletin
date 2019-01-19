// @flow
import * as React from 'react';
import BeaconDetector from './BeaconDetector';
import RoomList from './RoomList';

export default ({ navigation }: any) => (
  <BeaconDetector>
    <RoomList navigation={navigation} />
  </BeaconDetector>
);
