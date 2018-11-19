// @flow
import { Booking } from '../models';
import { BookingDoc } from '../models/bookingModel';
import findTimeslots from '../../utils/findTimeslots';

// GET /booking/{bookingId}
export function getBooking(req: express$Request, res: express$Response) {
  Booking.findById()
    .then(bookings => res.json(bookings))
    .catch(err => res.send(err));
}

// GET /bookings
// returns a map (bookingId: {day, start, duration, roomId, bookingId})
export function getAllBookings(req: express$Request, res: express$Response) {
  Booking.find()
    .then(bookings => res.json(bookings))
    .catch(err => res.send(err));
}

// GET /bookings/rooms/{roomId}/ for today or
// GET /bookings/rooms/{roomId}/?date=YYYY-MM-DD for any future date
// returns an array of date isoStrings
export function getTimeslots(req: express$Request, res: express$Response) {
  let date = new Date().toISOString().split('T')[0];
  if (req.query.date) {
    const newDate = req.query.date;
    if (typeof newDate === 'string') {
      date = newDate;
    } else {
      date = newDate[0];
    }
  }

  Booking.find({ roomId: req.params.roomId, day: date })
    .then(bookings => {
      const timeslots = findTimeslots(bookings, date);
      res.json(timeslots);
    })
    .catch(err => res.send(err));
}

// POST /bookings
// Request body contains start and duration, day is optional (default today)
// returns a booking id (UUID)
export function createBooking(req: express$Request, res: express$Response) {
  const bookingProposal = req.body;
  console.log('booookingchecked', bookingProposal);
  if (checkBooking(bookingProposal)) {
    console.log('booookingchecked', bookingProposal);
    const booking = new Booking(bookingProposal);
    booking
      .save()
      .then(bookingResult => {
        res.json(bookingResult);
      })
      .catch(err => {
        res.send(err);
      });
  }
}

// DELETE /bookings/{bookingId}/ to delete a specific booking
export function deleteBooking(req: express$Request, res: express$Response) {
  Booking.find({ name: req.params.bookingId })
    .then(() => res.json({ message: `Booking ${req.params.bookingId} successfully deleted` }))
    .catch(err => res.send(err));
}

// DELETE /bookings/rooms/{roomId} to delete all bookings for that specific room
export function deleteBookingsForRoom(_req: express$Request, _res: express$Response) {
  // TODO
}

const stringIsValid = (str: string) => Boolean(str) && str.length > 0;
const durationIsValid = (duration: number) => duration >= 30 && duration <= 120;
const checkBooking = ({ day, start, duration, roomId }) => {
  console.log(day, stringIsValid(day), durationIsValid(duration));
  return stringIsValid(day) && stringIsValid(start) && stringIsValid(roomId) && durationIsValid(duration);
};
