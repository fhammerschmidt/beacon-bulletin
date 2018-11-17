// @flow
import { getAllBeacons, addBeacons, getBeacon, updateBeacon, deleteBeacon } from '../controllers/beaconController';
import { getAllRooms, addRooms, getRoom, deleteRoom } from '../controllers/roomController';
import {
  getBooking,
  getAllBookings,
  getTimeslots,
  createBooking,
  deleteBooking,
} from '../controllers/bookingController';

export default function routes(app: express$Application) {
  // Beacon Routes
  app
    .route('/beacons')
    .get(getAllBeacons)
    .post(addBeacons);

  app
    .route('/beacons/:beaconId')
    .get(getBeacon)
    .put(updateBeacon)
    .delete(deleteBeacon);

  // Room Routes
  app
    .route('/rooms')
    .get(getAllRooms)
    .post(addRooms);

  app
    .route('/rooms/:roomId')
    .get(getRoom)
    .delete(deleteRoom);

  // Booking Routes
  app.route('/bookings').get(getAllBookings);

  app
    .route('/bookings/:bookingId')
    .get(getBooking)
    .delete(deleteBooking);

  // Booking actions dependent on rooms
  app
    .route('/bookings/rooms/:roomId')
    .get(getTimeslots)
    .post(createBooking)
    .delete(deleteBooking);
}
