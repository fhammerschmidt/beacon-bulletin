// @flow
import { getAllBeacons, addBeacon, getBeacon, updateBeacon, deleteBeacon } from '../controllers/beaconController';
import { getAllRooms, addRoom, getRoom, deleteRoom } from '../controllers/roomController';

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
}
