// @flow
import { getAllBeacons, addBeacons, getBeacon, updateBeacon, deleteBeacon } from '../controllers/beaconController';
import { getAllRooms, addRooms, getRoom, deleteRoom, deleteAllRooms } from '../controllers/roomController';
import {
  getBooking,
  getAllBookings,
  getTimeslots,
  createBooking,
  deleteBooking,
  deleteBookingsForRoom,
  getBookingsForRoom,
} from '../controllers/bookingController';

export default function routes(app: express$Application) {
  // Avoid 404 for default route, get beacons.
  app.route('/').get(getAllBeacons);
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

  app.route('/rooms/deleteAll').delete(deleteAllRooms);

  app
    .route('/rooms/:roomId')
    .get(getRoom)
    .delete(deleteRoom);

  // Booking Routes
  app
    .route('/bookings')
    .get(getAllBookings)
    .post(createBooking);

  app
    .route('/bookings/:bookingId')
    .get(getBooking)
    .delete(deleteBooking);

  // Booking actions depending on room
  app
    .route('/bookings/rooms/:roomId')
    .get(getBookingsForRoom)
    .delete(deleteBookingsForRoom);

  // Timeslots for bookings depending on room
  app.route('/timeslots/:roomId').get(getTimeslots);
}
