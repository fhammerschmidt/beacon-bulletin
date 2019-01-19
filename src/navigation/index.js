// @flow
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
// import BeaconsScreen from '../components/BeaconDetector';
// import RoomsScreen from '../components/RoomList';
import RoomsScreen from '../components/Rooms';
import RoomDetailScreen from '../components/RoomDetailScreen';
import BookingsScreen from '../components/BookingList';
import BookingDetailScreen from '../components/BookingDetail';
import AdminScreen from '../components/Admin';

const RoomsStack = createStackNavigator(
  {
    // Beacons: BeaconsScreen,
    Rooms: RoomsScreen,
    RoomDetail: RoomDetailScreen,
  },
  {
    navigationOptions: {
      header: null,
    },
  }
);

const BookingsStack = createStackNavigator(
  {
    Bookings: BookingsScreen,
    BookingDetail: BookingDetailScreen,
  },
  {
    navigationOptions: {
      header: null,
    },
  }
);

const AdminStack = createStackNavigator(
  {
    Admin: AdminScreen,
  },
  {
    navigationOptions: {
      header: null,
    },
  }
);

export default createMaterialTopTabNavigator({
  Rooms: RoomsStack,
  Bookings: BookingsStack,
  Admin: AdminStack,
});
