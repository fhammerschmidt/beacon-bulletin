import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  DeviceEventEmitter
} from 'react-native';
import Beacons from 'react-native-beacons-android'

// Tells the library to detect iBeacons
Beacons.detectIBeacons();

// Start detecting all iBeacons in the nearby
Beacons.startRangingBeaconsInRegion('REGION1')
  .then(() => console.log(`Beacons monitoring started succesfully!`))
  .catch(error => console.log(`Beacons monitoring not started, error: ${error}`));

// Print a log of the detected iBeacons (evert 1 second)
DeviceEventEmitter.addListener('beaconsDidRange', (data) => {
  console.log('Found beacons!', data)
});

class beaconBulletinApp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to the Beacon Bulletin App!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('beaconBulletinApp', () => beaconBulletinApp);
