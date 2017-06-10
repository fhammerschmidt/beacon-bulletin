'use strict';

module.exports = function(app) {
  const beaconController = require('../controllers/beaconController');
  const roomController = require('../controllers/roomController');

  // Beacon Routes
  app.route('/beacons')
    .get(beaconController.get_all_beacons)
    .post(beaconController.add_a_beacon);

  app.route('/beacon/:beaconId')
    .get(beaconController.get_a_beacon)
    .put(beaconController.update_a_beacon)
    .delete(beaconController.delete_a_beacon);


  // Room Routes
  app.route('/rooms')
    .get(roomController.get_all_rooms)
    .post(roomController.add_a_room);

  app.route('/room/:roomId')
    .get(roomController.get_a_room)
    .delete(roomController.delete_a_room);
};
