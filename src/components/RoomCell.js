// @flow
import * as React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

import type { Room } from '../../apiTypes';
import Icon from './Icon';

export default class RoomCell extends React.Component<*> {
  props: {
    rowData: Room,
    onRowPressed: (id: string) => void,
  };

  render() {
    const { rowData } = this.props;

    return (
      <TouchableHighlight onPress={this.handleRowPressed}>
        <View style={styles.cell}>
          <Text style={styles.iconContainer} type="room">
            <Icon name="account_balance" size={24} />
          </Text>
          <Text numberOfLines={1} style={styles.text}>
            {rowData.name}
          </Text>
          <Text style={styles.caret}>&#x25B6;</Text>
        </View>
      </TouchableHighlight>
    );
  }

  handleRowPressed = () => {
    const { rowData, onRowPressed } = this.props;
    onRowPressed(rowData.name);
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
