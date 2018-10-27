// @flow
import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  start: String,
  duration: Number,
  roomId: String,
});

export class BookingDoc /* :: extends Mongoose$Document */ {
  start: string;
  duration: number;
  roomId: string;
}

BookingSchema.loadClass(BookingDoc);

export default mongoose.model('Bookings', BookingSchema);
