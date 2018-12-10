// @flow
import mongoose, { Schema } from 'mongoose';

const BookingSchema = new Schema({
  day: String,
  start: String,
  duration: Number,
  roomId: String,
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
