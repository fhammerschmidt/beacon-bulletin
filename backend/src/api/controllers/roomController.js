// @flow
import { Room } from '../models';

export function getAllRooms(req: express$Request, res: express$Response) {
  Room.find({}, (err, room) => (err ? res.send(err) : res.json(room)));
}

export function addRoom(req: express$Request, res: express$Response) {
  // store list of rooms
  if (req.body instanceof Array) {
    req.body.map(room => {
      const newRoom = new Room(storeRoom(room));
      return newRoom.save((err, _room) => (err ? res.send(err) : res));
    });
  } else if (typeof req.body === 'string') {
    // store single room
    const newRoom = new Room(storeRoom(req.body));
    newRoom.save((err, room) => (err ? res.send(err) : res.json(room)));
  } else {
    throw new Error('Can not store room, unsupported or unknown type.');
  }
}

export function getRoom(req: express$Request, res: express$Response) {
  Room.findById(req.params.roomId, (err, room) => (err ? res.send(err) : res.json(room)));
}

export function deleteRoom(req: express$Request, res: express$Response) {
  Room.findByIdAndRemove(
    req.params.roomId,
    (err, _room) => (err ? res.send(err) : res.json({ message: 'Room successfully deleted' }))
  );
}

function storeRoom(room) {
  // Create room model object from single string.
  return {
    name: room,
    building: room.substring(0, room.indexOf('.')),
    level: room.substring(room.indexOf('.') + 1, room.lastIndexOf('.')),
  };
}
