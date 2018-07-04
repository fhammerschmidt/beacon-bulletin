// @flow
import * as React from 'react';
import { StyleSheet, Text, FlatList, View, DeviceEventEmitter } from 'react-native';

import { PRIMARY_APP_COLOR } from '../constants';
import detectBeacons from '../utils/detectBeacons';
import Icon from './Icon';

const beaconData = require('../../docs/data.json'); // eslint-disable-line import/no-commonjs

type Props = {};
type State = {
  beacons: [],
};

type Beacon = {
  uuid: string,
  major: string,
  minor: string,
  rssi: string,
  proximity: string,
  accuracy: number,
};

type EmitterSubscription = {
  remove(): void,
};

export default class BeaconDetector extends React.Component<Props, State> {
  beaconsDidRange: EmitterSubscription;
  regionDidEnter: EmitterSubscription;
  regionDidExit: EmitterSubscription;

  state = {
    beacons: [],
    regions: [],
  };

  UNSAFE_componentWillMount() {
    const region = { identifier: 'REGION1', uuid: beaconData.regions[0].uuid };
    detectBeacons(region, 'IBEACON');
  }

  componentDidMount() {
    console.log(beaconData);
    this.beaconsDidRange = DeviceEventEmitter.addListener('beaconsDidRange', data => {
      console.log('beaconData', data);
      this.setState({
        beacons: data.beacons,
      });
    });

    this.regionDidEnter = DeviceEventEmitter.addListener('regionDidEnter', data => {
      console.log('monitoring - regionDidEnter data: ', data);
    });

    this.regionDidExit = DeviceEventEmitter.addListener('regionDidExit', data => {
      console.log('monitoring - regionDidExit data: ', data);
    });
  }

  componentWillUnMount() {
    this.beaconsDidRange.remove();
    this.regionDidEnter.remove();
    this.regionDidExit.remove();
  }

  render() {
    const { beacons } = this.state;
    return (
      <View style={styles.container}>
        <Icon name="settings_input_antenna" color={PRIMARY_APP_COLOR} size={36} />
        <Text style={styles.headline}>All beacons in the area</Text>
        <FlatList data={beacons} renderItem={this.renderRow} />
      </View>
    );
  }

  renderRow = (info: { item: Beacon, index: number }) => {
    const { uuid, major, minor, rssi, proximity, accuracy } = info.item;
    return (
      <View key={info.index} style={styles.row}>
        <Text style={styles.smallText}>UUID: {uuid ? uuid : 'NA'}</Text>
        <Text style={styles.smallText}>Major: {major ? major : 'NA'}</Text>
        <Text style={styles.smallText}>Minor: {minor ? minor : 'NA'}</Text>
        <Text>RSSI: {rssi ? rssi : 'NA'}</Text>
        <Text>Proximity: {proximity ? proximity : 'NA'}</Text>
        <Text>Distance: {accuracy ? `${accuracy.toFixed(2)}m` : 'NA'}</Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  headline: {
    fontSize: 20,
    paddingTop: 20,
  },
  row: {
    padding: 8,
    paddingBottom: 16,
  },
  smallText: {
    fontSize: 11,
  },
});
