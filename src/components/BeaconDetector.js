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
import { ALL_BEACON_UUIDS } from '../constants';

type Props = {
  children: React.Node,
};

type State = {
  region: Region,
  beaconUuidName: string,
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
    region: { identifier: 'REGION1', uuid: ALL_BEACON_UUIDS.default },
    beaconUuidName: 'default',
    beacons: [],
  };

  componentDidMount() {
    this.startDetection();
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
        toggleBeaconUuid: this.toggleUuid,
      });
    });
  }

  updateBeaconState = (nb: BeaconRegion) => {
    const beacons = filterBeacons(nb, this.state.beacons);
    this.setState({ beacons });
  };

  startDetection = () => {
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
  };

  toggleUuid = () => {
    stopRangingAndMonitoring(this.state.region);
    const { beaconUuidName, region } = this.state;
    const updatedBeaconUuidName = beaconUuidName === 'default' ? 'kontakt' : 'default';
    this.setState({
      beaconUuidName: updatedBeaconUuidName,
      region: { ...region, uuid: ALL_BEACON_UUIDS[updatedBeaconUuidName] },
    });

    console.log('beaconstate', this.state);
    this.startDetection();
  };
}
