// @flow
import * as React from 'react';
import Beacons, { type BeaconRegion } from '@nois/react-native-beacons-manager';

import detectBeacons, { type Region } from '../utils/detectBeacons';

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
  beaconsDidEnterEvent: EmitterSubscription = null;
  beaconsDidLeaveEvent: EmitterSubscription = null;
  beaconsServiceDidConnect: any = null;

  state = {
    region: { identifier: 'REGION1', uuid: 'e2c56db5-dffb-48d2-b060-d0f5a71096e0' },
    beacons: [],
  };

  componentDidMount() {
    // const uuid = '01122334-4556-6778-899a-abbccddeeff0';
    detectBeacons(this.state.region, 'IBEACON');

    // we need to wait for service connection to ensure synchronization:
    this.beaconsServiceDidConnect = Beacons.BeaconsEventEmitter.addListener('beaconServiceConnected', () => {
      console.log('service connected');
      this.startRangingAndMonitoring();
    });

    this.beaconsDidRangeEvent = Beacons.BeaconsEventEmitter.addListener(
      'beaconsDidRange',
      (response: { beacons: BeaconRegion[], uuid: string, identifier: string }) => {
        console.log('BEACONS: ', response);

        response.beacons.forEach(beacon =>
          this.updateBeaconState({
            identifier: response.identifier,
            uuid: String(beacon.uuid),
            major: parseInt(beacon.major, 10) >= 0 ? beacon.major : '',
            minor: parseInt(beacon.minor, 10) >= 0 ? beacon.minor : '',
            proximity: beacon.proximity ? beacon.proximity : '',
            rssi: beacon.rssi ? beacon.rssi : '',
            distance: beacon.distance ? beacon.distance : 0,
            time: new Date().getTime(),
          })
        );
      }
    );
  }

  componentWillUnMount() {
    this.stopRangingAndMonitoring();
    this.beaconsDidEnterEvent.remove();
    this.beaconsDidLeaveEvent.remove();
    this.beaconsDidRangeEvent.remove();
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
    const diffBeacon = data => !(data.uuid === nb.uuid && data.minor === nb.minor && data.major === nb.major);

    const { beacons } = this.state;
    const diffBeacons = [...beacons.filter(diffBeacon), nb];
    // Kick out old beacons after being not in range for 30 seconds (30000ms).
    const keptBeacons = diffBeacons.filter(b => nb.time - b.time < 30000).sort((a, b) => b.rssi - a.rssi);

    this.setState({ beacons: keptBeacons });
  };

  startRangingAndMonitoring = async () => {
    const { region } = this.state;

    try {
      await Beacons.startRangingBeaconsInRegion(region);
      console.log('Beacons ranging started successfully');
      await Beacons.startMonitoringForRegion(region);
      console.log('Beacons monitoring started successfully');
    } catch (error) {
      throw error;
    }
  };

  stopRangingAndMonitoring = async () => {
    const { region } = this.state;

    try {
      await Beacons.stopRangingBeaconsInRegion(region);
      console.log('Beacons ranging stopped successfully');
      await Beacons.stopMonitoringForRegion(region);
      console.log('Beacons monitoring stopped successfully');
    } catch (error) {
      throw error;
    }
  };
}
