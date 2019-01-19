// @flow
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import type { Room } from '../../apiTypes';
import { Button, IconButton } from './Button';

type Props = {
  room: Room,
  onBackPress?: () => void,
};

export default class RoomDetail extends React.Component<Props> {
  render() {
    const {
      room: { name },
      onBackPress,
    } = this.props;
    return (
      <View style={styles.container}>
        <DetailRow title="Room Name:" value={name} />
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
