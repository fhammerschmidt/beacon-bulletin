// @flow
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import type { Room, Booking } from '../../apiTypes';
import { Button, IconButton } from './Button';
import BookingCell from './BookingCell';

type Props = {
  room: Room,
  bookings: Booking[],
  onBackPress?: () => void,
  getBookings: (roomId: string) => void,
};

export default class RoomDetail extends React.Component<Props> {
  componentDidMount() {
    const { room, getBookings } = this.props;
    getBookings(room.id);
  }

  render() {
    const {
      room: { name },
      bookings,
      onBackPress,
    } = this.props;
    return (
      <View style={styles.container}>
        <DetailRow title="Room Name:" value={name} />
        {bookings.map((booking, i) => (
          <BookingCell key={i} booking={booking} />
        ))}

        {onBackPress && <IconButton onPress={this.handleBackPressed} iconName="view_headling" label="Go back" />}
        <Button onPress={this.handleBookRoomPressed} label="Book Room now" />
      </View>
    );
  }

  handleBackPressed = () => {
    const { onBackPress } = this.props;
    if (onBackPress) {
      onBackPress();
    }
  };

  handleBookRoomPressed = () => {
    console.log('bookRoomPressed');
  };
}

function DetailRow({ title, value }: { title: string, value: string }) {
  return (
    <View style={styles.detail}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
    padding: 8,
    marginBottom: 8,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  title: {},
  value: {
    textAlign: 'right',
    flex: 1,
    fontWeight: 'bold',
  },
});
