// @flow
import * as React from 'react';

import RoomDetailConnector from './RoomDetailConnector';

type Props = {
  navigation: any,
};

export default class RoomDetailScreen extends React.Component<Props> {
  render() {
    const { navigation } = this.props;
    const roomId = navigation.getParam('roomId', 'NO-ID');
    console.log('roomId', roomId);
    return <RoomDetailConnector roomId={roomId} onBackPress={this.handleBackPress} />;
  }

  handleBackPress = () => {
    this.props.navigation.goBack();
  };
}
