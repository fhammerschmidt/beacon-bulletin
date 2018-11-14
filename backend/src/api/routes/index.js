// @flow
import { getAllBeacons, addBeacon, getBeacon, updateBeacon, deleteBeacon } from '../controllers/beaconController';
import { getAllRooms, addRoom, getRoom, deleteRoom } from '../controllers/roomController';
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
    .post(addBeacon);

  app
    .route('/beacon/:beaconId')
    .get(getBeacon)
    .put(updateBeacon)
    .delete(deleteBeacon);

  // Room Routes
  app
    .route('/rooms')
    .get(getAllRooms)
    .post(addRoom);

  app
    .route('/room/:roomId')
    .get(getRoom)
    .delete(deleteRoom);

  // Booking Routes
  app.route('/bookings').get(getAllBookings);

  app
    .route('/booking/:bookingId')
    .get(getBooking)
    .delete(deleteBooking);

  // Booking actions dependent on rooms
  app
    .route('/booking/room/:roomId')
    .get(getTimeslots)
    .post(createBooking)
    .delete(deleteBooking);
}
