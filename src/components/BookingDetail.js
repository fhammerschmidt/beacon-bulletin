// @flow
import * as React from 'react';
import { Text, View } from 'react-native';

type Props = {
  navigation: any,
};

export default class BookingDetail extends React.Component<Props> {
  render() {
    const { navigation } = this.props;
    const bookingId = navigation.getParam('bookingId', 'NO-ID');

    return (
      <View>
        <Text>BookingDetail No: {bookingId}</Text>
        <Text>RoomNo</Text>
      </View>
    );
  }
}
