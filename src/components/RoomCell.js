// @flow
import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import type { Room } from '../../apiTypes';
import Icon from './Icon';

export default class RoomCell extends React.PureComponent<*> {
  props: {
    room: Room,
    onRowPressed: (room: Room) => void,
  };

  render() {
    const { room } = this.props;

    return (
      <TouchableOpacity onPress={this.handleRowPressed}>
        <View style={styles.cell}>
          <Text style={styles.iconContainer} type="room">
            <Icon name="account_balance" size={24} />
          </Text>
          <Text numberOfLines={1} style={styles.text}>
            {room.name}
          </Text>
          <Text style={styles.caret}>&#x25B6;</Text>
        </View>
      </TouchableOpacity>
    );
  }

  handleRowPressed = () => {
    const { room, onRowPressed } = this.props;
    onRowPressed(room);
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
