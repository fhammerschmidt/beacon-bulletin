// @flow
import * as React from 'react';
import BeaconList from './BeaconList';

import BeaconDetector from './BeaconDetector';

export default ({ navigation }: any) => (
  <BeaconDetector>
    <BeaconList navigation={navigation} />
  </BeaconDetector>
);
