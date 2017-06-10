'use-strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BeaconSchema = new Schema({
  region: String,
  major: String,
  minor: String,
  assignedRooms: [String],
});

module.exports = mongoose.model('Beacons', BeaconSchema);
