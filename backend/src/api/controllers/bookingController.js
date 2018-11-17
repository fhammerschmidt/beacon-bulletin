// @flow
import { Booking } from '../models';
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

  Booking.find({ roomId: req.params.roomId, day: date })
    .then(bookings => {
      const timeslots = findTimeslots(bookings, date);
      res.json(timeslots);
    })
    .catch(err => res.send(err));
}

// POST /booking/byRoom/{roomId}/
// Request body contains start and duration, day is optional (default today)
// returns a booking id (UUID)
export function createBooking(req: express$Request, res: express$Response) {
  // store list of bookings
  const newBookings = req.body.map(booking => storeBooking(booking));
  Booking.insertMany(newBookings)
    .then(rooms => {
      res.json(rooms);
    })
    .catch(err => {
      res.send(err);
    });
}

// DELETE /booking/{bookingId}/ to delete all bookings for that specific room or
export function deleteBooking(_req: express$Request, _res: express$Response) {
  // TODO
}

function storeBooking(booking) {
  // Create room model object from single string.
  return {
    name: room,
    building: room.substring(0, room.indexOf('.')),
    level: room.substring(room.indexOf('.') + 1, room.lastIndexOf('.')),
  };
}
