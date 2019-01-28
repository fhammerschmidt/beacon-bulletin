// @flow
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import RoomsScreen from '../components/Rooms';
import RoomDetailScreen from '../components/RoomDetailScreen';
import BookingsScreen from '../components/BookingList';
import BookingDetailScreen from '../components/BookingDetail';
import AdminScreen from '../components/Admin';
import AddBeaconScreen from '../components/AddBeaconScreen';
import { COLORS } from '../constants';

const RoomsStack = createStackNavigator(
  {
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
    AddBeacon: AddBeaconScreen,
  },
  {
    navigationOptions: {
      header: null,
    },
  }
);

export default createMaterialTopTabNavigator(
  {
    Rooms: RoomsStack,
    Bookings: BookingsStack,
    Admin: AdminStack,
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: COLORS.PRIMARY,
      },
    },
  }
);
