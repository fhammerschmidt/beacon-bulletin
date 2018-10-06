// @flow
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BeaconSchema = new Schema({
  region: String,
  major: String,
  minor: String,
  assignedRooms: [String],
});

export default mongoose.model('Beacons', BeaconSchema);
