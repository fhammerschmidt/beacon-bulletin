// @flow
import * as React from 'react';
import { View } from 'react-native';

import AddBeacon from './AddBeacon';
import UserInfoView from './UserInfoView';
import { Button } from './Button';

type Props = {
  navigation: any,
};

export default class AddBeaconScreen extends React.Component<Props> {
  render() {
    const { navigation } = this.props;
    const beacon = navigation.getParam('beacon', null);
    if (beacon) {
      return <AddBeacon beacon={beacon} onBackPress={this.handleBackPress} />;
    } else {
      return (
        <View>
          <UserInfoView message="Beacon data lost" />
          <Button onPress={this.handleBackPress} label="Go back" />
        </View>
      );
    }
  }

  handleBackPress = () => {
    this.props.navigation.goBack();
  };
}
