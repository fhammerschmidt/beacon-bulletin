// @flow
import * as React from 'react';
import Beacons, { type BeaconRegion } from '@nois/react-native-beacons-manager';

import {
  filterBeacons,
  createRegion,
  startRangingAndMonitoring,
  stopRangingAndMonitoring,
} from '../utils/beaconHelpers';
import detectBeacons, { type Region } from '../utils/detectBeacons';
import { DEFAULT_BEACON_UUID } from '../constants';

type Props = {
  children: React.Node,
};

type State = {
  region: Region,
  beacons: BeaconRegion[],
};

type EmitterSubscription =
  | {
      remove(): void,
    }
  | any;

export default class BeaconDetector extends React.Component<Props, State> {
  beaconsDidRangeEvent: EmitterSubscription = null;
  beaconsServiceDidConnect: any = null;

  state = {
    region: { identifier: 'REGION1', uuid: DEFAULT_BEACON_UUID },
    beacons: [],
  };

  componentDidMount() {
    const { region } = this.state;
    detectBeacons(region, 'IBEACON');

    // we need to wait for service connection to ensure synchronization:
    this.beaconsServiceDidConnect = Beacons.BeaconsEventEmitter.addListener('beaconServiceConnected', () => {
      console.log('service connected');
      startRangingAndMonitoring(region);
    });

    this.beaconsDidRangeEvent = Beacons.BeaconsEventEmitter.addListener('beaconsDidRange', response => {
      console.log('BEACONS: ', response);

      response.beacons.forEach(beacon => this.updateBeaconState(createRegion(response, beacon)));
    });
  }

  componentWillUnMount() {
    stopRangingAndMonitoring(this.state.region);
    // this.beaconsDidRangeEvent.remove();
  }

  render() {
    const { beacons } = this.state;
    return React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        beacons,
      });
    });
  }

  updateBeaconState = (nb: BeaconRegion) => {
    const beacons = filterBeacons(nb, this.state.beacons);
    this.setState({ beacons });
  };
}
