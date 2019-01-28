// @flow
import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { type BeaconRegion } from '@nois/react-native-beacons-manager';
import Icon from './Icon';

export default class BeaconCell extends React.PureComponent<*> {
  props: {
    beacon: BeaconRegion,
    onRowPressed: (beacon: BeaconRegion) => void,
  };

  render() {
    const { beacon } = this.props;

    return (
      <TouchableOpacity onPress={this.handleRowPressed}>
        <View style={styles.cell}>
          <Text style={styles.iconContainer}>
            <Icon name="bluetooth" size={24} />
          </Text>
          <View style={styles.cellBody}>
            <Text>
              Major: {beacon.major.toString()}, Minor: {beacon.minor.toString()}
            </Text>
          </View>
          <Text style={styles.caret}>&#x25B6;</Text>
        </View>
      </TouchableOpacity>
    );
  }

  handleRowPressed = () => {
    const { beacon, onRowPressed } = this.props;
    onRowPressed(beacon);
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
  cellBody: {
    paddingHorizontal: 8,
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
});
