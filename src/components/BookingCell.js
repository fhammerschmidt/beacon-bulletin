// @flow
import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import type { Booking } from '../../apiTypes';
import Icon from './Icon';

const createDate = ({ day, start, duration }: Booking) => {
  return `${day} ${start} - ${start.substring(0, 3)}${duration}}`;
};

export default class BookingCell extends React.Component<*> {
  props: {
    booking: Booking,
    onRowPressed?: (id: string) => void,
  };

  render() {
    const { booking } = this.props;

    return (
      <TouchableOpacity onPress={this.handleRowPressed}>
        <View style={styles.cell}>
          <Text style={styles.iconContainer} type="room">
            <Icon name="account_balance" size={24} />
          </Text>
          <Text numberOfLines={1} style={styles.text}>
            {createDate(booking)}
            {booking.roomId}
          </Text>
          <Text style={styles.caret}>&#x25B6;</Text>
        </View>
      </TouchableOpacity>
    );
  }

  handleRowPressed = () => {
    const { booking, onRowPressed } = this.props;
    if (onRowPressed) {
      onRowPressed(booking.id);
    }
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
