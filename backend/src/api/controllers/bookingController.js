// @flow
import type { ApiBooking } from '../../../../apiTypes';
import { Room, Booking } from '../models';
import findTimeslots from '../../utils/findTimeslots';
import checkBooking from '../../utils/checkBooking';
import { getDateString } from '../../utils/date';

// GET /booking/{bookingId}
export function getBooking(req: express$Request, res: express$Response) {
  Booking.findById(req.params.bookingId)
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

// GET /bookings/rooms/{roomId}
export function getBookingsForRoom(req: express$Request, res: express$Response) {
  Booking.find({ roomId: req.params.roomId })
    .then(bookings => res.json(bookings))
    .catch(err => res.send(err));
}

// GET /timeslots/{roomId}/ for today or
// GET /timeslots/{roomId}/?date=YYYY-MM-DD for any future date
// returns an array of date isoStrings
export function getTimeslots(req: express$Request, res: express$Response) {
  let date = new Date();
  if (req.query.date) {
    const newDate = req.query.date;
    if (typeof newDate === 'string') {
      date = new Date(newDate);
    } else {
      date = new Date(newDate[0]);
    }
  }

  Booking.find({ roomId: req.params.roomId, day: getDateString(date) })
    .then(bookings => {
      const timeslots = findTimeslots(bookings, date);
      res.json(timeslots);
    })
    .catch(err => res.send(err));
}

// POST /bookings
// Request body contains start and duration, day is optional (default today)
// returns a booking id (UUID)
export function createBooking(req: any, res: express$Response) {
  const bookingProposal: ApiBooking = req.body;
  Room.count({ id: bookingProposal.roomId })
    .then(count => {
      if (count > 0) {
        res.status(400);
        res.send('Room does not exist');
      }

      if (!checkBooking(bookingProposal)) {
        res.status(400);
        res.send('Booking invalid');
      }

      const booking = new Booking(bookingProposal);
      booking
        .save()
        .then(bookingResult => {
          res.json(bookingResult);
        })
        .catch(err => {
          res.send(err);
        });
    })
    .catch(err => res.send(err));
}

// DELETE /bookings/{bookingId}/ to delete a specific booking
export function deleteBooking(req: express$Request, res: express$Response) {
  Booking.find({ id: req.params.bookingId })
    .then(() => res.json({ message: `Booking ${req.params.bookingId} successfully deleted` }))
    .catch(err => res.send(err));
}

// DELETE /bookings/rooms/{roomId} to delete all bookings for that specific room
export function deleteBookingsForRoom(req: express$Request, res: express$Response) {
  Booking.deleteMany({ roomId: req.params.roomId })
    .then(() => res.json({ message: `Bookings for room ${req.params.roomId} successfully deleted` }))
    .catch(err => res.send(err));
}
