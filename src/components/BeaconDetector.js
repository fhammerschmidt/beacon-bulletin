import React, { Component } from 'react';
import { StyleSheet, Text, ListView, View, DeviceEventEmitter } from 'react-native';

import { PRIMARY_APP_COLOR } from '../constants';
import detectBeacons from '../utils/detectBeacons';
import BeaconBulletinIcons from './BeaconBulletinIcons';

const beaconData = require('../../docs/data.json'); // eslint-disable-line import/no-commonjs

export default class BeaconDetector extends Component {
  constructor(props) {
    super(props);
    // Create our dataSource which will be displayed in the ListView
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2 }
    );
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
  }

  componentWillMount() {
    detectBeacons(beaconData.regions[0].uuid, 'IBEACON');
  }

  componentDidMount() {
    this.beaconsDidRange = DeviceEventEmitter.addListener('beaconsDidRange',
      data => {
        console.log(data.beacons);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(data.beacons),
        });
      }
    );
  }

  componentWillUnMount() {
    this.beaconsDidRange = null;
  }

  render() {
    const { dataSource } = this.state;
    return (
      <View style={styles.container}>
        <BeaconBulletinIcons name="settings_input_antenna" color={PRIMARY_APP_COLOR} size={36}/>
        <Text style={styles.headline}>All beacons in the area</Text>
        <ListView
          dataSource={dataSource}
          enableEmptySections={true}
          renderRow={this.renderRow}
        />
      </View>
    );
  }

  renderRow = rowData => {
    return (
      <View style={styles.row}>
        <Text style={styles.smallText}>
          UUID: {rowData.uuid ? rowData.uuid : 'NA'}
        </Text>
        <Text style={styles.smallText}>
          Major: {rowData.major ? rowData.major : 'NA'}
        </Text>
        <Text style={styles.smallText}>
          Minor: {rowData.minor ? rowData.minor : 'NA'}
        </Text>
        <Text>
          RSSI: {rowData.rssi ? rowData.rssi : 'NA'}
        </Text>
        <Text>
          Proximity: {rowData.proximity ? rowData.proximity : 'NA'}
        </Text>
        <Text>
          Distance: {rowData.accuracy ? `${rowData.accuracy.toFixed(2)}m` : 'NA'}
        </Text>
      </View>
    );
  }
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
