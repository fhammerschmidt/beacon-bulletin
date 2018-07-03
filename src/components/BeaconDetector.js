// @flow
import * as React from 'react';
import { StyleSheet, Text, FlatList, View, DeviceEventEmitter } from 'react-native';

import { PRIMARY_APP_COLOR } from '../constants';
import detectBeacons from '../utils/detectBeacons';
import BeaconBulletinIcons from './BeaconBulletinIcons';

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

export default class BeaconDetector extends React.Component<Props, State> {
  beaconsDidRange: ?Object;

  constructor(props: Props) {
    super(props);
    this.state = {
      beacons: [],
    };
  }

  componentDidMount() {
    detectBeacons(beaconData.regions[0].uuid, 'IBEACON');
    this.beaconsDidRange = DeviceEventEmitter.addListener('beaconsDidRange', data => {
      this.setState({
        beacons: data.beacons,
      });
    });
  }

  componentWillUnMount() {
    this.beaconsDidRange = null;
  }

  render() {
    const { beacons } = this.state;
    return (
      <View style={styles.container}>
        <BeaconBulletinIcons name="settings_input_antenna" color={PRIMARY_APP_COLOR} size={36} />
        <Text style={styles.headline}>All beacons in the area</Text>
        <FlatList data={beacons} renderItem={this.renderRow} />
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
