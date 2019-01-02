// @flow
import { Room } from '../models';
import type { ApiRoom } from '../../../../apiTypes';

// GET /rooms
export function getAllRooms(req: express$Request, res: express$Response) {
  Room.find()
    .then(room => res.json(room))
    .catch(err => res.send(err));
}

// POST /rooms
export function addRooms(req: express$Request, res: express$Response) {
  // store list of rooms
  if (req.body instanceof Array) {
    const newRooms: ApiRoom[] = req.body.map(room => storeRoom(room));
    Room.insertMany(newRooms)
      .then(rooms => {
        res.json(rooms);
      })
      .catch(err => {
        res.send(err);
      });
  } else {
    res.send('Can not store room, unsupported or unknown type.');
  }
}

// GET /rooms/{roomId}
export function getRoom(req: express$Request, res: express$Response) {
  Room.find({ name: req.params.roomId })
    .then(room => res.json(room))
    .catch(err => res.send(err));
}

// DELETE /rooms/{roomId}
export function deleteRoom(req: express$Request, res: express$Response) {
  Room.deleteOne({ name: req.params.roomId })
    .then(() => res.json({ message: 'Room successfully deleted' }))
    .catch(err => res.send(err));
}

// DELETE /rooms
export function deleteAllRooms(req: express$Request, res: express$Response) {
  Room.deleteMany({})
    .then(() => res.json({ message: 'All rooms successfully deleted' }))
    .catch(err => res.send(err));
}

function storeRoom(room: string): ApiRoom {
  // Create room model object from single string.
  return {
    name: room,
    building: room.substring(0, room.indexOf('.')),
    level: room.substring(room.indexOf('.') + 1, room.lastIndexOf('.')),
  };
}
