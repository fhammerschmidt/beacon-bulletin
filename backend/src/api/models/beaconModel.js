// @flow
import mongoose, { Schema } from 'mongoose';

const BeaconSchema = new Schema({
  region: { type: String, required: true },
  major: { type: String, required: true },
  minor: { type: String, required: true },
  assignedRooms: [String],
});

export class BeaconDoc /* :: extends Mongoose$Document */ {
  region: string;
  major: string;
  minor: string;
  assignedRooms: Array<string>;
}

BeaconSchema.loadClass(BeaconDoc);
BeaconSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Beacons', BeaconSchema);
