// @flow

export type ApiBeacon = {
  region: string,
  major: string,
  minor: string,
  assignedRooms: Array<string>,
};

export type ApiRoom = {
  name: string,
  building: string,
  level: string,
};

export type ApiBooking = {
  day: string,
  start: string,
  duration: number,
  roomId: string,
};

export type Beacon = ApiBeacon & {
  id: string,
};

export type Room = ApiRoom & {
  id: string,
};

export type Booking = ApiBooking & {
  id: string,
};
