// @flow
import mongoose, { Schema } from 'mongoose';

const BeaconSchema = new Schema({
  region: String,
  major: String,
  minor: String,
  assignedRooms: [String],
});

export class BeaconDoc /* :: extends Mongoose$Document */ {
  region: string;
  major: string;
  minor: string;
  assignedRooms: Array<string>;
}

BeaconSchema.loadClass(BeaconDoc);

export default mongoose.model('Beacons', BeaconSchema);
