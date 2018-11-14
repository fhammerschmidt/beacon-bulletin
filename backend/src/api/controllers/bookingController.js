// @flow
import { Booking } from '../models';
import findTimeslots from '../../utils/findTimeslots';

// GET /booking/{bookingId}
// returns a single booking
export function getBooking(req: express$Request, res: express$Response) {
  Booking.findById({}, (err, bookings) => (err ? res.send(err) : res.json(bookings)));
}

// GET /bookings
// returns a map (bookingId: {day, start, duration, roomId, bookingId})
export function getAllBookings(req: express$Request, res: express$Response) {
  Booking.find({}, (err, bookings) => (err ? res.send(err) : res.json(bookings)));
}

// GET /booking/byRoom/{roomId}/ for today or
// GET /booking/byRoom/{roomId}/?date=YYYY-MM-DD for any future date
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

  Booking.find({ roomId: req.params.roomId, day: date }, (err, bookings) => {
    if (err) {
      res.send(err);
    } else {
      const timeslots = findTimeslots(bookings, date);
      res.json(timeslots);
    }
  });
}

// POST /booking/byRoom/{roomId}/
// Request body contains start and duration, day is optional (default today)
// returns a booking id (UUID)
export function createBooking(_req: express$Request, _res: express$Response) {
  // TODO
}

// DELETE /booking/{bookingId}/ to delete all bookings for that specific room or
export function deleteBooking(_req: express$Request, _res: express$Response) {
  // TODO
}
