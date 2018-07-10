// @flow
import * as React from 'react';
import { StyleSheet, Text, FlatList, View, DeviceEventEmitter } from 'react-native';

import { PRIMARY_APP_COLOR } from '../constants';
import detectBeacons from '../utils/detectBeacons';
import Icon from './Icon';

const beaconData = require('../../docs/data.json'); // eslint-disable-line import/no-commonjs

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

type Props = {};
type State = {
  beacons: Beacon[],
};

export default class BeaconDetector extends React.Component<Props, State> {
  beaconsDidRange: EmitterSubscription;
  regionDidEnter: EmitterSubscription;
  regionDidExit: EmitterSubscription;

  state = {
    beacons: [],
    regions: [],
  };

  componentDidMount() {
    // const uuid = '01122334-4556-6778-899a-abbccddeeff0';
    const { uuid } = beaconData.regions[0];
    // ADAFRUIT Bluefruit Beacon UUID: 01122334-4556-6778-899a-abbccddeeff0
    const region = { identifier: 'REGION1', uuid };
    detectBeacons(region, 'IBEACON');

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
        <FlatList data={beacons} renderItem={this.renderRow} keyExtractor={this.keyExtractor} />
      </View>
    );
  }

  renderRow = (info: { item: Beacon, index: number }) => {
    const { uuid, major, minor, rssi, proximity, accuracy } = info.item;
    return (
      <View style={styles.row}>
        <Text style={styles.smallText}>UUID: {uuid ? uuid : 'NA'}</Text>
        <Text style={styles.smallText}>Major: {major ? major : 'NA'}</Text>
        <Text style={styles.smallText}>Minor: {minor ? minor : 'NA'}</Text>
        <Text>RSSI: {rssi ? rssi : 'NA'}</Text>
        <Text>Proximity: {proximity ? proximity : 'NA'}</Text>
        <Text>Distance: {accuracy ? `${accuracy.toFixed(2)}m` : 'NA'}</Text>
      </View>
    );
  };

  keyExtractor = (item: Beacon, index: number) => index.toString();
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
