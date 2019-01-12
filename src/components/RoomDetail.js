// @flow
import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

type Props = {
  navigation: any,
};

export default class RoomDetail extends React.Component<Props> {
  render() {
    const { navigation } = this.props;
    const roomId = navigation.getParam('roomId', 'NO-ID');

    return (
      <View>
        <Text>RoomDetail No: {roomId}</Text>
        <Text>RoomNo</Text>
        <Text>&nbsp;</Text>
        <View>
          <TouchableOpacity onPress={this.handleBackPress}>
            <Text>Go back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  handleBackPress = () => {
    this.props.navigation.goBack();
  };
}
