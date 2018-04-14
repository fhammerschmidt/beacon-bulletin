// @flow
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

import type { Room } from '../reducers/data';
import BeaconBulletinIcons from './BeaconBulletinIcons';

export default class RoomCell extends Component {
  props: {
    rowData: Room,
    onRowPressed: (id: number) => void,
  };

  render() {
    const { rowData } = this.props;

    return (
      <TouchableHighlight onPress={this.handleRowPressed}>
        <View style={styles.cell}>
          <Text style={styles.iconContainer} type="room">
            <BeaconBulletinIcons name="account_balance" size={24} />
          </Text>
          <Text numberOfLines={1} style={styles.text}>
            {rowData.fullName}
          </Text>
          <Text style={styles.caret}>&#x25B6;</Text>
        </View>
      </TouchableHighlight>
    );
  }

  handleRowPressed = () => {
    const { rowData, onRowPressed } = this.props;
    onRowPressed(rowData.id);
  };
}

const styles = StyleSheet.create({
  cell: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 60,
    marginBottom: 4,
  },
  iconContainer: {
    borderRightWidth: 1,
    paddingHorizontal: 8,
    textAlign: 'center',
  },
  caret: {
    flex: 1,
    textAlign: 'right',
    paddingHorizontal: 8,
  },
  text: {
    paddingHorizontal: 8,
  },
});
