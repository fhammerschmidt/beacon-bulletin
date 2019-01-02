// @flow
import mongoose, { Schema } from 'mongoose';

const BookingSchema = new Schema({
  day: { type: String, required: true },
  start: { type: String, required: true },
  duration: { type: Number, required: true },
  roomId: { type: String, required: true },
});

export class BookingDoc /* :: extends Mongoose$Document */ {
  day: string;
  start: string;
  duration: number;
  roomId: string;
}

BookingSchema.loadClass(BookingDoc);
BookingSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Bookings', BookingSchema);
