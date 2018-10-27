// @flow

// GET /bookings
// returns a map (bookingId: {startTime, duration, roomId, bookingId})
export function getBookings(_req: express$Request, _res: express$Response) {
  // TODO
}

// GET /bookings/rooms/{roomId}/ for today or
// GET /bookings/rooms/{roomId}/?date=YYYY-MM-DD for any future date
// returns an array of date isoStrings
export function getTimeslots(_req: express$Request, _res: express$Response) {
  // TODO
}

// POST /bookings/rooms/{roomId}/{dateTime}
// returns a booking id (UUID)
export function createBooking(_req: express$Request, _res: express$Response) {
  // TODO
}

// DELETE /bookings/rooms/{roomId}/ to delete all bookings for that specific room or
// DELETE /bookings/{bookingId} to delete a specific booking.
export function deleteBooking(_req: express$Request, _res: express$Response) {
  // TODO
}
