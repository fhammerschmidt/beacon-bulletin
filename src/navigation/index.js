// @flow
import { createMaterialTopTabNavigator } from 'react-navigation';
import BeaconsScreen from '../components/BeaconDetector';
// import RoomsScreen from '../components/RoomList';
import SettingsScreen from '../components/Settings';

// eslint-disable-next-line babel/new-cap
export default createMaterialTopTabNavigator({
  Beacons: {
    screen: BeaconsScreen,
  },
  // Rooms: {
  //   screen: RoomsScreen,
  // },
  Settings: {
    screen: SettingsScreen,
  },
});
