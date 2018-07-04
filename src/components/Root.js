// @flow
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import BluetoothState from 'react-native-bluetooth-state';

import Navigation from '../navigation';
import UserInfoView from './UserInfoView';

// Bluetooth states from https://github.com/Artirigo/react-native-bluetooth-state#usage, "resetting" is iOS only.
type BluetoothStateType = 'on' | 'off' | 'unknown' | 'unauthorized' | 'unsupported' | 'resetting';

type State = {
  bluetooth: BluetoothStateType,
};

export default class Root extends React.Component<{}, State> {
  state = {
    bluetooth: 'unknown',
  };

  stateChangeHandler = (bluetoothState: BluetoothStateType) => {
    this.setState({ bluetooth: bluetoothState });
    console.log('bluetoothState', bluetoothState);
  };

  componentDidMount() {
    BluetoothState.subscribe(this.stateChangeHandler);
    BluetoothState.initialize();
  }

  componentWillUnmount() {
    BluetoothState.unsubscribe(this.stateChangeHandler);
  }

  render() {
    const { bluetooth } = this.state;
    switch (bluetooth) {
      case 'on':
        return (
          <View style={styles.container}>
            <Navigation />
          </View>
        );
      case 'off':
        return (
          <UserInfoView
            message={`Bluetooth is turned off.\nPlease enable it for this app to work.`}
            icon="bluetooth_disabled"
          />
        );
      case 'unknown':
      case 'unsupported':
      default:
        return <UserInfoView message={`Error: Can not utilize bluetooth module.\nThis app requires bluetooth.`} />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
